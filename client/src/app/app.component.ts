import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { DataService } from './utils/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    public isQABuild: boolean;
    public showResearchNav: boolean;
    public showGradNav: boolean;

    public dataErrors: string;
    public imageErrors: string;
    public initiatives: any[];
    private currentUrl: string;

    title = 'Engagement Lab @ Emerson College';

    @ViewChild('attributes') attributions: ElementRef;
    @ViewChild('consent') consent: ElementRef;
    @ViewChild('revoke') revoke: ElementRef;

    @ViewChild('canvasElement') canvasElement: ElementRef;

    constructor(
        private router: Router,
        private titleSvc: Title,
        private dataSvc: DataService,
    ) {
        this.isQABuild = environment.qa;
        this.titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);
    }

    ngOnInit() {
        // Monitor router
        this.router.events.subscribe(async evt => {
            if (!(evt instanceof NavigationEnd)) return;

            // Get nav route when nav ends
            this.currentUrl = this.router.url;

            // Reset relevant initiative page elements by default
            document.getElementById('logo-img').classList.remove('white');
            if (!evt.url.includes('initiatives')) {
                document.getElementById('initiative-bg').classList.value = '';
            }

            // Show research nav?
            this.showResearchNav = evt.url.indexOf('/research') === 0;
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
                const errors = value.map(v => v.message);
                this.dataErrors = errors.join(', ');
                // Images missing
                if (errors[0].indexOf('Image.public_id.') > 0)
                    this.imageErrors = value[0].path;
            }
        });
    }

    ngAfterViewInit() {
        // Cookie consent decided? Hide banner
        if (document.cookie.indexOf('cookieconsent_status=') > -1) {
            this.consent.nativeElement.classList.remove('show');
            this.revoke.nativeElement.classList.add('show');
            // start GA tracking if consented
            if (document.cookie.indexOf('cookieconsent_status=allow') > -1)
                window['ga']('create', 'UA-64617433-1', 'auto');
        }
    }

    // Is passed route active?
    subNavitemActive(route: string) {
        return this.currentUrl === route;
    }

    initiativeActive() {
        return (
            this.currentUrl &&
            this.currentUrl.indexOf('/research/initiatives') > -1
        );
    }

    studiosActive() {
        return this.currentUrl.indexOf('/studios/') > -1;
    }

    dismissErrors() {
        this.dataErrors = null;
        this.imageErrors = null;
    }

    closeAttributions() {
        this.attributions.nativeElement.classList.remove('open');
    }

    consentClick(allow: boolean) {
        // Set consent cookie
        let d: Date = new Date();
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        let expires: string = `expires=${d.toUTCString()}`;
        document.cookie = `cookieconsent_status=${
            allow ? 'allow' : 'deny'
        };expires=${expires} GMT;path=/`;

        // Start GA tracking
        if (allow) window['ga']('create', 'UA-64617433-1', 'auto');

        this.consent.nativeElement.classList.remove('show');
        this.revoke.nativeElement.classList.add('show');
    }

    consentShowClick() {
        this.consent.nativeElement.classList.add('show');
        this.revoke.nativeElement.classList.remove('show');
    }
}
