import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
    public jobs: unknown;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const query = `
            {
                allJobsPages {
                    date
                    title
                    description
                    url
                }
            }
        `;
        this.jobs = await this._dataSvc.getSet('jobs', query);
    }
}
