import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../utils/data.service';

import {isScullyGenerated, TransferStateService} from '@scullyio/ng-lib';

import * as _ from 'underscore';
import { shareReplay, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ProjectIndexComponent implements OnInit {

  public projects: any[];
  public projectFeatured: any;
  public projectsArchived: any[];
  public projectTypeNames: string[];
  public projectTypesCount: Object;
  public projectTypesTotal: number;
  
  public isPhone: boolean;

  @ViewChildren('projectList') projectList: QueryList<any>;  

  apiContent$ = this.http.get<any[]>(`http://localhost:3000/get/projects`).pipe(
    catchError(() => of([] as any[])),
    shareReplay(1)
  );

  content$ = isScullyGenerated() ? 
            this._transferState.getState<any[]>('content-projects') : 
            this.apiContent$.pipe(tap(project => {
              this._transferState.setState('content-projects', project);
            }));
  
  constructor(private _dataSvc: DataService, private _transferState: TransferStateService, private http: HttpClient) {}

  ngOnInit() {
    
    // this._dataSvc.getSet('projects').subscribe(response => {
      
    // });


  }

  ngAfterViewInit() {

    // this.projectList.changes.subscribe(t => {
  
    //     // this.mixer = mixitup(document.getElementById('projects'), {
    //     //   animation: {
    //     //     effects: 'fade'
    //     //   }
    //     // });
      
    //   // if not even count of projects, add a dummy once so last one doesn't center
    //   if(this.projects.length % 2 === 1)
    //     this.projects.push({projectType: 'dummy', key: 'dummy'});
        
    //     // AOS.init();
    // });

  }

  ngOnDestroy() {

    // Destroy mixer when user leaves
    // if(this.mixer)
    //   this.mixer.destroy();

  }
}
