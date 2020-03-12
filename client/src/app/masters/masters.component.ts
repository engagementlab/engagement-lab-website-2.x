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

    async ngOnInit(): Promise<any> {
        const response = await this._dataSvc.getSet('masters');
        this.content = response['masters'];
        this.people = response['people'];

        // We have to add dummy/empty people if non-x4 count to allow for correct flex layout
        const mod = this.people.length % 4;
        for (let i = 0; i < mod; i++) this.people.push({ name: 'dummy' });
    }

    getPerson(key: string): void {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;

        const response = this._dataSvc.getSet('team', key);
        this.currentPerson = response['person'];
    }

    closePerson() {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this._router.navigateByUrl('masters');
    }
}
