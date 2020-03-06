import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';

import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import * as _ from 'underscore';

@Injectable()
export class DataService {
    public isLoading: Subject<boolean> = new Subject<boolean>();
    public serverProblem: Subject<boolean> = new Subject<boolean>();

    public previousUrl: string;
    public currentUrl: string;

    private devUrl: string;

    constructor(private _transferState: TransferStateService, private _http: HttpClient, private _router: Router) {
        this.devUrl = 'http://localhost:3000';

        _router.events.subscribe(event => {
            this.currentUrl = this._router.url;
            // Track prior url
            if (event instanceof NavigationStart) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
        });
    }

    public async getSet(page: string, param: string = null, search = false): Promise<any[]> {
        const stateKey = page;
        if (!search) this.isLoading.next(true);

        let url = `${this.devUrl}/get/${page}`;
        if (param) url = url + '/' + param;

        // If scully is building or dev build, cache data from content API in transferstate
        if (!isScullyGenerated()) {
            try {
                const res = await this._http.get<any[]>(url).toPromise();
                this._transferState.setState(stateKey, res);

                return res;
            } catch (error) {
                this.isLoading.next(false);
                throw Error(error);
            }
        } else {
            // if(environment.universal) {
            const state = new Promise<any[]>((resolve, reject) => {
                try {
                    this._transferState.getState<any[]>(stateKey).subscribe(res => {
                        resolve(res);
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
