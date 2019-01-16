import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

  public content: any;  

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {

    this._dataSvc.getDataForUrl('masters/get/').subscribe(response => {
      
      this.content = response[0];

    });
  }

}
