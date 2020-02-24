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

  public faculty: any[];
  public staff: any[];
  public board: any[];
  public fellows: any[];
  public currentPerson: any;

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
      // document.getElementById('person-modal').style.display = 'flex';

    });
  }

  closePerson() {
    
    this.currentPerson = undefined;
    this._location.go('team');
    
    // document.getElementById('person-modal').style.display = 'none';

  }

  ngOnInit() {

    // Pre-load person?
    let key = this._route.snapshot.paramMap.get('key');
    if(key)
      this.getPerson(key);

    this._dataSvc.getDataForUrl('team/get/').subscribe(response => {   
      
      this.faculty = _.filter(response.people, (person) => { return person.category === 'faculty leadership'; });
      this.staff = _.filter(response.people, (person) => { return person.category === 'staff'; });
      this.board = _.filter(response.people, (person) => { return person.category === 'advisory board'; });
      this.fellows = _.filter(response.people, (person) => { return person.category === 'faculty fellows'; })

    });

  }


}
