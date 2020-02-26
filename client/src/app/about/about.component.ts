import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

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

   }

  ngOnInit() {

    this._dataSvc.retrieve('about/get/').subscribe(response => {
      this.about = response.about[0];    
      this.partners = response.partners;    
      this.people = response.people;    
    });

  }

}
