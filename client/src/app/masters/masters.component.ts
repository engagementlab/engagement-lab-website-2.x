import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

  public content: any;  
  public people: any;  

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {

    this._dataSvc.getDataForUrl('masters/get/').subscribe(response => {
      
      this.content = response.masters;
      this.people = response.people;

      // We have to add dummy/empty people if non-x4 count to allow for correct flex layout
      let mod = this.people.length % 4;
      for(let i=0; i<mod; i++)
        this.people.push({name:'dummy'});
        
    });
  }

}
