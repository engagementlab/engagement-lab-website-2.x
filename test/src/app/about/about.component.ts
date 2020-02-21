import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import isMobile from 'ismobilejs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public isPhone: boolean;
  public isTablet: boolean;
  public about: any;
  public partners: any[];
  public people: any[];

  constructor(private _dataSvc: DataService) { 
    
    let agent = isMobile(window.navigator.userAgent);
    this.isPhone = agent.phone;
    this.isTablet = agent.tablet;

   }

  ngOnInit() {

    this._dataSvc.getDataForUrl('about/get/').subscribe(response => {
      this.about = response.about[0];    
      this.partners = response.partners;    
      this.people = response.people;    
    });

  }

}
