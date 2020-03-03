import { Injectable, Inject, PLATFORM_ID, Optional, Injector } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import {isScullyGenerated, TransferStateService} from '@scullyio/ng-lib';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';

import * as _ from 'underscore';
import { tap } from 'rxjs/operators';

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
    private _transferState: TransferStateService,
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

    let stateKey = makeStateKey<any>(`content-${page}`)
    if(!search)
      this.isLoading.next(true);

    // responses.pipe(
    //     switchMap(id =>
    //       this.http.get<Post[]>(`http://localhost:8200/posts?userId=${id}`).pipe(
    //         catchError(() =>
    //           of({
    //             id,
    //             title: 'not found',
    //           } as Post)
    //         )
    //       )
    //     ),
    //     shareReplay(1)
    //   );

    // If universal build, cache data from content API in transferstate
    if (!isScullyGenerated()) {
     
      let url = `${this.devUrl}/get/${page}`;
      if(param) url = url+param;
    
      return this.http.get(url)
      .pipe((res:any)=> {
        this._transferState.setState(stateKey, res);
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
         this._transferState.getState(stateKey)
          .pipe(tap(res => {
            console.log(res)
            sub.next(res);
            // this._transferState.remove(stateKey)
          }));
          this.isLoading.next(false);
        });
        
      // }

    }

  }

}
