import { Component, OnInit } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { version } from '../../../package.json';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    public appVersion: string;

    constructor(private _scrollToSvc: ScrollToService) {
        this.appVersion = `v${version}`;
    }

    ngOnInit() {}

    public scrollToTop() {
        this._scrollToSvc.scrollTo({
            target: document.getElementById('nav'),
            offset: 0,
            easing: 'easeOutQuint',
            duration: 700,
        });
    }

    public openAttributions() {
        document.getElementById('attributions').classList.add('open');
    }
}
