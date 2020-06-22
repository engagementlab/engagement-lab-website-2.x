import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
    public content: unknown;

    // eslint-disable-next-line no-useless-constructor
    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allPrivacyPages {
                        date: Date
                        name: String!
                        content: String!
                        lastUpdated: Date
                }
            }
        `;

        this.content = await this.dataSvc.getSet('privacy', query)[
            'allPrivacyPages'
        ];
    }
}
