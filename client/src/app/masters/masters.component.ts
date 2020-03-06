import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-masters',
    templateUrl: './masters.component.html',
    styleUrls: ['./masters.component.scss'],
})
export class MastersComponent implements OnInit {
    public content: any;
    public people: any;
    public currentPerson: any;

    private gettingPerson: boolean;

    constructor(private _dataSvc: DataService, private _route: ActivatedRoute, private _router: Router) {
        this._route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params['key']);
        });
    }

    ngOnInit() {
        /* 
    this._dataSvc.getSet('masters/get/').subscribe(response => {
      
      this.content = response.masters;
      this.people = response.people;

      // We have to add dummy/empty people if non-x4 count to allow for correct flex layout
      let mod = this.people.length % 4;
      for(let i=0; i<mod; i++)
        this.people.push({name:'dummy'});
        
    });
 */
    }

    getPerson(key) {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;

        /*     this._dataSvc.getSet('team/get/'+key).subscribe(response => {
      
      this.currentPerson = response.person;

    }); */
    }

    closePerson() {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this._router.navigateByUrl('masters');

        // window.scrollTo(0, 0);
    }
}
