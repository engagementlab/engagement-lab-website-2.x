import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class EventIndexComponent implements OnInit {

  public events: any[];

  // @ViewChildren('projectList') projectList: QueryList<any>;

  constructor(private _dataSvc: DataService) { 
  
    this._dataSvc.getDataForUrl('events/get/').subscribe(response => {
      
      this.events = response;
      
    });
  
  }

  ngOnInit() {
  }

}
