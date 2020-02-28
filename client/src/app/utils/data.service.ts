import { Injectable, Inject, PLATFORM_ID, Optional, Injector } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

import * as _ from 'underscore';

@Injectable()
export class DataService {

  public isLoading: Subject<boolean> = new Subject<boolean>();
  public serverProblem: Subject<boolean> = new Subject<boolean>();

  public previousUrl: string;
  public currentUrl: string;

  private devUrl: string;
  private buildUrl: string;
  
  private STATE_KEY = makeStateKey<any>('content');

  constructor(
    @Inject(PLATFORM_ID) private platformId, 
    private _transferState: TransferState,
    private http: HttpClient, 
    private _router: Router) {

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

  public getSet(page: string, param: string = null, search: boolean = false): Observable<any> {

    if(!search)
      this.isLoading.next(true);

    // If universal build, cache express content data in transferstate
    if (isPlatformServer(this.platformId)) {
    //   return new Observable(sub => {
    //     // db.all("SELECT * FROM homepage", (err, rows) => {
    //     // let content = this._request['content'];

    //     sub.next({})
    //   });
     
      let url = `${this.devUrl}/get/${page}`;
      if(param) url = url+param;
    
      return this.http.get(url)
      .map((res:any)=> {
        this._transferState.set(this.STATE_KEY, res);
        return res;
      })
      .catch((error:any) => {
          this.isLoading.next(false);
          return throwError(error);
      });


    }
    else {

      console.log('CLIENT')
      // if(environment.universal) {        
       return new Observable(sub => {
          let result = this._transferState.get(this.STATE_KEY, null);
          sub.next(result);
          this.isLoading.next(false);
        });
      // }

    }

  }

}
