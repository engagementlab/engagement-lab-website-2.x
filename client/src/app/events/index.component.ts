import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class EventIndexComponent implements OnInit {
    public events: unknown;
    public pastEvents: unknown;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit() {
        // const response = await this._dataSvc.getSet('events');
        const query = `
            {
                allEvents {
                    name
                    key
                    date
                    shortDescription 
                    eventUrl
                    description
                    {
                        html
                    }
                    showButton
                    buttonTxt
                    images {
                        public_id
                    }
                }
            }
        `;
        const response = await this._dataSvc.getSet('homepage', query);
        this.groupDates(response);
    }

    groupDates(data: unknown): void {
        const returnedEvents = data['allEvents'];
        _.each(returnedEvents, event => {
            event.future = new Date(event.date).getTime() > new Date().getTime();
        });

        this.events = _.where(returnedEvents, { future: true });
        this.pastEvents = _.where(returnedEvents, { future: false });
    }
}
