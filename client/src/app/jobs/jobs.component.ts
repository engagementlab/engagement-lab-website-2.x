import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
    public jobs: any[];

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        this.jobs = await this._dataSvc.getSet('jobs');
    }
}