import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import * as _ from 'underscore';

@Injectable()
export class DataService {
    public isLoading: Subject<boolean> = new Subject<boolean>();

    public errors: Subject<any[]> = new Subject<any[]>();

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private transferState: TransferStateService,
        private _apollo: Apollo,
    ) { }

    /**
     * Retrieve data with page type, key, and query and get/set in transferstate
     * @function
     * @returns Promise
     * @param {string} page - Name of page type, e.g. 'events'
     * @param {string} key - Key identifying individual page, e.g. 'my-event'
     * @param {string} query - Data query for GraphQL
     */
    public async getSetWithKey(
        page: string,
        key: string,
        query: string,
    ): Promise<unknown> {
        return this.getSet(page, query, key);
    }

    /**
     * Retrieve data with page name and query and get/set in transferstate
     * @function
     * @returns Promise
     * @param {string} page - Name of page type, e.g. 'events'
     * @param {string} query - Data query for GraphQL
     * @param {string} [param] - Key identifying individual page, e.g. 'my-event'
     */
    public async getSet(
        page: string,
        query: string,
        param: string = null,
    ): Promise<unknown> {
        if (!query) {
            this.errors.next([`No query provided for page "${page}"!`]);
            return;
        }

        let stateKey = page;
        // if (!search) this.isLoading.next(true);
        if (param) stateKey += `_${param}`;

        // If scully is building or dev build, cache data from content API in transferstate
        if (!isScullyGenerated()) {
            // Query apollo w/ provided string
            const content = new Promise<unknown>((resolve, reject) => {
                this._apollo
                    .query({
                        query: gql`
                            ${query}
                        `,
                        errorPolicy: 'all',
                    })
                    .subscribe(
                        result => {
                            if (result.errors) {
                                this.errors.next(
                                    result.errors.map(err => err.message),
                                );
                                this.isLoading.next(result.loading);
                                reject(result.errors);

                                return;
                            }
                            // Cache result in state
                            this.transferState.setState(stateKey, result);
                            this.isLoading.next(false);

                            resolve(result.data);
                        },
                        err => {
                            console.log('err', err);
                        },
                    );
            });
            return content;
        }

        // Get cached state for this key
        const state = new Promise<unknown[]>((resolve, reject) => {
            try {
                this.transferState
                    .getState<unknown[]>(stateKey)
                    .subscribe(res => {
                        if (res) resolve(res);
                    });
            } catch (error) {
                this.isLoading.next(false);
                reject(error);
            }
        });
        return state;
    }
}
