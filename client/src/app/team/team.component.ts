import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from '../utils/data.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public currentPerson: any;

  public people: { [key: string]: any[] } = {};

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute, private _router: Router, private _location: Location) { 
  
    this._route.params.subscribe(params => {
      
      if(Object.keys(params).length < 1) return;
      this.getPerson(params['key']);

    });
  
  }

  getPerson(key) {      

    this.currentPerson = undefined;
    this._dataSvc.getDataForUrl('team/get/'+key).subscribe(response => {
      
      this.currentPerson = response.people;

    });
  }

  closePerson() {
    
    this.currentPerson = undefined;
    this._location.go('team');

    window.scrollTo(0, 0);

  }

  ngOnInit() {

    // Pre-load person?
    let key = this._route.snapshot.paramMap.get('key');
    if(key) {
      this.getPerson(key);
      // TODO: load all other only on modal close
      // return;
    }

    this._dataSvc.getDataForUrl('team/get/').subscribe(response => {   
      
      this.people['faculty'] = _.filter(response.people, (person) => { return person.category === 'faculty leadership'; });
      this.people['staff'] = _.filter(response.people, (person) => { return person.category === 'staff'; });
      this.people['board'] = _.filter(response.people, (person) => { return person.category === 'advisory board'; });
      this.people['fellows'] = _.filter(response.people, (person) => { return person.category === 'faculty fellows'; })

      // We have to add dummy/empty people to categories with non-x4 count to allow for correct flex layout
      for(key in this.people) {
        let mod = this.people[key].length % 4;
        for(let i=0; i<mod; i++)
          this.people[key].push({name:'dummy'});
      }

    });

  }


}
