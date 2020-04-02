import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-masters',
    templateUrl: './masters.component.html',
    styleUrls: ['./masters.component.scss'],
})
export class MastersComponent implements OnInit {
    public content: any;
    public people: any;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        // Pre-load person?
        // const key = this._route.snapshot.paramMap.get('key');
        // if (key) this.getPerson(key);

        const response = await this._dataSvc.getSet('masters');
        this.content = response['masters'];
        this.people = response['people'];

        // We have to add dummy/empty people if non-x4 count to allow for correct flex layout
        const mod = this.people.length % 4;
        for (let i = 0; i < mod; i++) this.people.push({ name: 'dummy' });
    }
}
