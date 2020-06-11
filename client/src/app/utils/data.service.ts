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
    public errors: Subject<string[]> = new Subject<string[]>();

    constructor(private _transferState: TransferStateService, private _apollo: Apollo) {}

    public async getSet(page: string, query: string, param: string = null, search = false): Promise<unknown> {
        let stateKey = page;
        if (!search) this.isLoading.next(true);
        if (param) stateKey += '_' + param;

        // If scully is building or dev build, cache data from content API in transferstate
        if (!isScullyGenerated()) {
            // Query apollo w/ provided string
            const content = new Promise<unknown>((resolve, reject) => {
                this._apollo
                    .watchQuery({
                        query: gql`
                            ${query}
                        `,
                    })
                    .valueChanges.subscribe(result => {
                        if (result.errors) {
                            // this.errors = result.errors;
                            this.isLoading.next(false);
                            reject(result.errors);
                            return;
                        }
                        this._transferState.setState(stateKey, result);
                        resolve(result.data);
                    });
            });
            return content;
        } else {
            // Get cached state for this key
            const state = new Promise<unknown[]>((resolve, reject) => {
                try {
                    this._transferState.getState<any[]>(stateKey).subscribe(res => {
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
}
