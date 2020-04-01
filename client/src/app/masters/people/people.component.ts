import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
})
export class MastersPeopleComponent implements OnInit {
    public cohorts: any[];

    public cohortKeys: string[];

    public currentPerson: any;

    private gettingPerson: boolean;

    constructor(private _dataSvc: DataService, private _router: Router, private _route: ActivatedRoute) {
        this._route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params.key);
        });
    }

    async ngOnInit(): Promise<void> {
        // Pre-load person
        const key = this._route.snapshot.paramMap.get('key');
        if (key) this.getPerson(key);

        this.cohorts = await this._dataSvc.getSet('masters', 'people');
        this.cohortKeys = Object.keys(this.cohorts);
    }

    async getPerson(key: string): Promise<void> {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;

        const response = await this._dataSvc.getSet('team', key);
        this.currentPerson = response;
    }

    closePerson(): void {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this._router.navigateByUrl('masters/people');
    }
}
