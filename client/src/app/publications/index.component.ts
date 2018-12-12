import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { DataService } from '../utils/data.service';

import * as cl from 'cloudinary-core';
import mixitup from 'mixitup';
import * as _ from 'underscore';
import * as AOS from 'aos';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class PublicationIndexComponent implements OnInit {

  public publications: any[];
  public pubTypesCount: Object;
  public pubTypesTotal: number;
  public pubTypeKeys: string[]; 


  @ViewChildren('publicationList') publicationList: QueryList<any>;

  constructor(private _dataSvc: DataService) { 
  
    this._dataSvc.getDataForUrl('publications/get/').subscribe(response => {
        this.publications = _.sortBy(response, (pub) => { return pub.form.key });    
               
        // get count of each pub type
        this.pubTypesCount = _.countBy(response, (obj) => {
          return obj.form.key;
        });
        this.pubTypesTotal = _.reduce(this.pubTypesCount, (memo, num) => { return memo + num; });

        // get all pub types and type names
        this.pubTypeKeys = Object.keys(this.pubTypesCount);

    });
  
  }


  ngOnInit() {
  }

  ngAfterViewInit() {

    this.publicationList.changes.subscribe(t => {
  
        let mixer = mixitup(document.getElementById('publications'));
        // AOS.init();
    });

  }

}
