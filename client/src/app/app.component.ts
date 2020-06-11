import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

import { environment } from '../environments/environment';
import { DataService } from './utils/data.service';

export const projectTransition = [
    query('#top', [
        style({ transform: 'translate3d(77%, 0, 0)' }),
        animate(0, style({ transform: 'translate3d(0, 0, 0)' })),
    ]),
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [trigger('routerAnimations', [transition('project => project', projectTransition)])],
})
export class AppComponent implements OnInit {
    public isQABuild: boolean;
    title = 'Engagement Lab @ Emerson College';

    constructor(private _router: Router, private _titleSvc: Title, private _dataSvc: DataService) {
        this.isQABuild = environment.qa;
        this._titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);
    }

    ngOnInit() {
        this._router.events.subscribe(evt => {
            if (!(evt instanceof NavigationEnd)) return;

            // Reset relevant initiative page elements by default
            document.getElementById('logo-img').classList.remove('white');
            if (!evt.url.includes('initiatives')) document.getElementById('initiative-bg').classList.value = '';

            if (evt.url.indexOf('/#') === 0) return;

            // Always go to top of page
            window.scrollTo(0, 0);
        });

        // TODO: Watch for any data/graphql errors
        this._dataSvc.errors.subscribe(value => {});
    }

    public prepareRouteTransition(outlet: any): void {
        const animation = outlet.activatedRouteData['animation'] || {};
        return animation['value'] || null;
    }
}
