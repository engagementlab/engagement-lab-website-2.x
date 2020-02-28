import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './utils/data.service';

import * as _ from 'underscore';
import * as paper from 'paper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public initiatives: any[];
  public featuredProjects: any[];
  public events: any[];
  public latestEvent: any;
  public tagline: string;

  public isPhone: boolean;

  @ViewChildren('initiativeList') initiativeList: QueryList<any>;

  @ViewChild('canvasElement') canvasElement: ElementRef;
  @ViewChild('pattern1') pattern1: ElementRef;
  @ViewChild('pattern2') pattern2: ElementRef;
  @ViewChild('pattern3') pattern3: ElementRef;

  constructor(private _dataSvc: DataService) {}

  ngOnInit() {

    this._dataSvc.getSet('homepage').subscribe(response => {
     
      this.initiatives = response.initiatives;
      this.featuredProjects = response.projects;    
      this.events = response.events;    
      this.tagline = response.tagline;

      this.latestEvent = response.events[response.events.length-1];

    });
  }

}