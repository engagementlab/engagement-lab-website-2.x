import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
    public jobs: any;

    // eslint-disable-next-line no-useless-constructor
    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allJobs {
                    date
                    title
                    description
                    url
                }
            }
        `;
        const result = await this.dataSvc.getSet('jobs', query);
        this.jobs = result['allJobs'];
    }
}
