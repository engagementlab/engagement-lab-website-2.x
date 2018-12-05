import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import * as AOS from 'aos';

import { DataService } from '../utils/data.service';
import mixitup from 'mixitup';
import * as _ from 'underscore';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ProjectIndexComponent implements OnInit {

  private projects: any[];
  private projectFeatured: any;
  private projectTypeNames: string[];
  private projectTypesCount: Object;
  private projectTypesTotal: number;

  @ViewChildren('projectList') projectList: QueryList<any>;

  constructor(private _dataSvc: DataService) { 
  
    this._dataSvc.getDataForUrl('projects/get/').subscribe(response => {
        this.projects = response;    
        this.projectFeatured = _.find(response, (obj) => {
          return obj.featured;
        });    
        
        // get count of each project types
        this.projectTypesCount = _.countBy(response, (obj) => {
          return obj.projectType;
        });
        this.projectTypeNames = Object.keys(this.projectTypesCount);
        this.projectTypesTotal = _.reduce(this.projectTypesCount, (memo, num) => { return memo + num; });
    });
  
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.projectList.changes.subscribe(t => {
  
        let mixer = mixitup(document.getElementById('projects'));
        AOS.init();
    });

  }

}
