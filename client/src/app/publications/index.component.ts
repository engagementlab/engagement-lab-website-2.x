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

  public pubs: any[];
  // public guides: any[];
  // public articles: any[];
  public pubTypesCount: Object;
  public pubTypesTotal: number;
  public pubTypeKeys: string[]; 

  private mixer: mixitup.mixer;

  @ViewChildren('publicationList') publicationList: QueryList<any>;

  constructor(private _dataSvc: DataService) { 
  
    this._dataSvc.getDataForUrl('publications/get/').subscribe(response => {
        this.pubs = response;
        // this.books = _.filter(pubs, (pub) => { return pub.form.key === 'book'; });
        // this.guides = _.filter(pubs, (pub) => { return pub.form.key === 'guide'; });
        // this.articles = _.filter(pubs, (pub) => { return pub.form.key === 'article-chapter'; });
               
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
  
        mixitup(document.getElementById('publications'), {
          animation: {
            effects: 'fade'
          }
        });
        // AOS.init();
    });

  }

  ngOnDestroy() {

    // Destroy mixer when user leaves
    if(this.mixer)
      this.mixer.destroy();

  }

}
