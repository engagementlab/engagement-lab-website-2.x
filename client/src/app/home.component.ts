import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from './utils/data.service';

import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private initiatives: any[];
  private featuredProjects: any[];

  @ViewChildren('initiativeList') initiativeList: QueryList<any>;

  constructor(private _dataSvc: DataService) {  }

  ngOnInit() {

    this._dataSvc.getDataForUrl('homepage/get/').subscribe(response => {
      this.initiatives = response.initiatives;    
      this.featuredProjects = response.projects;    
    });

  }

  ngAfterViewInit() {

    this.initiativeList.changes.subscribe(t => {
        AOS.init();
    });

  }

}
