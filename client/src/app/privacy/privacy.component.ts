import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
    public content: any;

    // eslint-disable-next-line no-useless-constructor
    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allPrivacyPages {
                    content {
                        html
                    }
                    lastUpdated
                }
            }
        `;

        const response = await this.dataSvc.getSet('privacy', query);
        this.content = response['allPrivacyPages'];
    }
}
