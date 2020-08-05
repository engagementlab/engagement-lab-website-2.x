import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
} from '@angular/animations';

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
    animations: [
        trigger('routerAnimations', [
            transition('project => project', projectTransition),
        ]),
    ],
})
export class AppComponent implements OnInit {
    public isQABuild: boolean;
    public showStudiosNav: boolean;
    public showResearchNav: boolean;
    public showGradNav: boolean;

    public dataErrors: string;
    public initiatives: any[];
    private currentUrl: string;

    title = 'Engagement Lab @ Emerson College';

    constructor(
        private router: Router,
        private titleSvc: Title,
        private dataSvc: DataService,
    ) {
        this.isQABuild = environment.qa;
        this.titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);
    }

    ngOnInit() {
        this.router.events.subscribe(async evt => {
            if (!(evt instanceof NavigationEnd)) return;

            // Get nav route when nav ends
            this.currentUrl = this.router.url;

            // Reset relevant initiative page elements by default
            document.getElementById('logo-img').classList.remove('white');
            if (!evt.url.includes('initiatives')) {
                document.getElementById('initiative-bg').classList.value = '';
            }

            // Show studios nav?
            this.showStudiosNav = evt.url.includes('studios');
            // Show research nav?
            this.showResearchNav = evt.url.includes('research');
            // Show graduate nav?
            this.showGradNav = evt.url.includes('graduate');

            // Get all current initiatives if on a research page
            if (this.showResearchNav) {
                const query = `
                {
                    allInitiativePages {
                    name
                        key
                    }
                }
            `;

                const content = await this.dataSvc.getSet(
                    'app-initiatives',
                    query,
                );
                this.initiatives = content['allInitiativePages'];
            }

            if (evt.url.indexOf('/#') === 0) return;

            // Always go to top of page
            window.scrollTo(0, 0);
        });

        // Watch for any data/graphql errors
        this.dataSvc.errors.subscribe(value => {
            if (value) {
                this.dataErrors = value.join(', ');
            }
        });
    }

    // Is passed route active?
    subNavitemActive(route: string) {
        return this.currentUrl.indexOf(`/${route}`) > -1;
    }

    public prepareRouteTransition(outlet: any): void {
        const animation = outlet.activatedRouteData.animation || {};
        return animation.value || null;
    }
}
