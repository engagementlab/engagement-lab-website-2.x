import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { DataService } from '../utils/data.service';
import { keyframes } from '@angular/animations';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class EventIndexComponent implements OnInit {
    public events: any;

    public pastEvents: any;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit() {
        // const response = await this._dataSvc.getSet('events');
        const query = `
            {
                allEvents {
                    name
                    key
                    date
                }
            }
        `;
        const response = await this._dataSvc.getSet('events', query);
        this.groupDates(response['allEvents']);
    }

    groupDates(allEvents: object): void {
        Object.keys(allEvents).forEach(key => {
            let event = allEvents[key];
            event.future =
                new Date(event.date).getTime() > new Date().getTime();
        });

        this.events = _.where(allEvents, { future: true });
        this.pastEvents = _.where(allEvents, { future: false });
    }
}
