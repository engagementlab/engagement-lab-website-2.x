import { Component, OnInit, ViewChildren, QueryList, Injector } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { DataService } from '../utils/data.service';

import * as _ from 'underscore';

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
  
  constructor(private _dataSvc: DataService, private _injector: Injector) { 
    
    // this._dataSvc.getDataForUrl('projects/get/').subscribe(response => {
    //     this.projects = response;    
    //     this.projectFeatured = _.find(response, (obj) => {
    //       return obj.featured;
    //     });
    //     this.projectsArchived = _.filter(response, (obj) => {
    //       return obj.archived;
    //     });
        
    //     // get count of each project types
    //     this.projectTypesCount = _.countBy(response, (obj) => {
    //       return obj.projectType;
    //     });
    //     this.projectTypeNames = Object.keys(this.projectTypesCount);
    //     this.projectTypesTotal = _.reduce(this.projectTypesCount, (memo, num) => { return memo + num; });
    // });
  
  }

  ngOnInit() {
    let content = this._injector.get(REQUEST)['content'];
    this.projects = content;    
    this.projectFeatured = _.find(content, (obj) => {
      return obj.featured;
    });
    this.projectsArchived = _.filter(content, (obj) => {
      return obj.archived;
    });

  }

  ngAfterViewInit() {

    this.projectList.changes.subscribe(t => {
  
        // this.mixer = mixitup(document.getElementById('projects'), {
        //   animation: {
        //     effects: 'fade'
        //   }
        // });
      
      // if not even count of projects, add a dummy once so last one doesn't center
      if(this.projects.length % 2 === 1)
        this.projects.push({projectType: 'dummy', key: 'dummy'});
        
        // AOS.init();
    });

  }

  ngOnDestroy() {

    // Destroy mixer when user leaves
    // if(this.mixer)
    //   this.mixer.destroy();

  }
}
