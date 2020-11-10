import { Component, OnInit } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
// eslint-disable-next-line import/prefer-default-export
export class ContactComponent implements OnInit {
    public content: any;

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private _dataSvc: DataService,
        private _scrollToSvc: ScrollToService,
    ) {}

    async ngOnInit(): Promise<any> {
        const query = `
            {
                allContactPages {                          
                    blurb
                    students
                    community
                }
            }
        `;
        const response = await this._dataSvc.getSet('getinvolved', query);
        this.content = response['allContactPages'];
    }

    public scrollToBottom() {
        this._scrollToSvc.scrollTo({
            target: document.getElementById('bottom'),
            offset: 0,
            easing: 'easeOutQuint',
            duration: 700,
        });
    }
}
