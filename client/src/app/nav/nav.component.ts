import {
    Component,
    ViewChild,
    ElementRef,
    QueryList,
    ViewChildren,
    AfterViewInit,
} from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';
import { DataService } from '../utils/data.service';

import { environment } from '../../environments/environment';

import Mark from 'mark.js';

interface Link {
    url?: string;
    href?: string;
    label: string;
    enabled?: boolean;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements AfterViewInit {
    public navLinks: Link[] = [
        { url: '', label: 'Home', enabled: true },
        { url: 'studios', label: 'Studios', enabled: true },
        { url: 'graduate', label: 'Graduate Program', enabled: true },
        { url: 'research', label: 'Research', enabled: true },
        { url: 'people', label: 'People', enabled: true },
        { url: 'about', label: 'About', enabled: true },
    ];

    public navSubLinks: Link[] = [
        { url: 'resources', label: 'Resources', enabled: true },
        { url: 'events', label: 'Events Calendar', enabled: true },
        {
            href: 'https://medium.com/engagement-lab-emerson-college',
            label: 'Lab Blog',
            enabled: true,
        },
        { url: 'partner', label: 'Partner With Us', enabled: true },
        { url: 'getinvolved', label: 'Get Involved', enabled: true },
        // TODO: in CMS?
        {
            href:
                'https://giving.emerson.edu/give-now?fid=h0ZJD8gm3R4%3d&fdesc=i%2bI0v73Km%2bQCb1p7mjPYeYE68k%2f8URMG',
            label: 'Donate',
            enabled: true,
        },
        { url: 'jobs', label: 'Jobs', enabled: true },
    ];

    public searchResults: any;
    public searchEnabled: boolean;
    public searchQuery: string;
    public logoSm: boolean;
    private currentUrl: string;
    private lastMenuScroll: number;

    @ViewChild('nav') nav: ElementRef;

    @ViewChild('searchField') searchField: ElementRef;

    @ViewChild('menuLinks') menuLinks: ElementRef;

    @ViewChild('home') homeLogo: ElementRef;

    @ViewChild('menu') menu: ElementRef;

    @ViewChild('menuBtn') menuBtn: ElementRef;

    @ViewChild('menuOpen') menuBtnOpen: ElementRef;

    @ViewChild('menuClose') menuBtnClose: ElementRef;

    @ViewChild('menuBg') menuBg: ElementRef;

    @ViewChildren('searchResultsList') searchResultsList: QueryList<
        HTMLDivElement
    >;

    constructor(private _router: Router, private dataSvc: DataService) {
        // Get nav route when nav ends
        this._router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(e => {
                this.currentUrl = this._router.url;

                // Adjust logo size based on page
                this.logoSm = this.currentUrl !== '/';
            });

        _router.events
            .pipe(filter(e => e instanceof NavigationStart))
            .subscribe(e => {
                // Close menu when nav starts
                if (
                    this.menuBtn &&
                    this.menuBtn.nativeElement.classList.contains('isOpen')
                ) {
                    this.openCloseNav();
                }
            });

        this.searchEnabled = environment.searchEnabled;
    }

    ngAfterViewInit() {
        this.searchResultsList.changes.subscribe(t => {
            const instance = new Mark(
                document.querySelectorAll('#results .result'),
            );
            instance.mark(this.searchQuery);
        });
    }

    openCloseNav(): void {
        this.menuBtn.nativeElement.classList.toggle('isOpen');
        this.menu.nativeElement.classList.toggle('isOpen');
        this.menuBg.nativeElement.classList.toggle('open');
        this.menuBtnClose.nativeElement.classList.toggle('isOpen');
        this.homeLogo.nativeElement.classList.toggle('hide');

        this.menuBg.nativeElement.classList.add('wasOpened');
        this.menu.nativeElement.classList.add('wasOpened');

        document.querySelector('body').classList.toggle('noscroll');
    }

    // Is passed route active?
    itemActive(route: string) {
        if (!this.currentUrl) return;

        let active = false;
        // Base root
        if (route === '') active = `/${route}` === this.currentUrl;
        else active = this.currentUrl.indexOf(`/${route}`) > -1;

        // Handle "partner" case
        if (route === 'partner' && this.currentUrl === '/studios/partnered')
            return false;

        return active;
    }

    // If on home when logo clicked, just close menu
    logoClick() {
        if (this.currentUrl === '/') this.openCloseNav();
    }

    onMenuScroll(event) {
        const currentScroll = event.currentTarget.scrollTop;

        // Hide close btn if scrolling past threshold where menu items cover it
        if (this.lastMenuScroll < 80 && currentScroll > 80)
            this.menuBtnClose.nativeElement.classList.add('hide');
        else if (currentScroll < 80)
            this.menuBtnClose.nativeElement.classList.remove('hide');

        this.lastMenuScroll = currentScroll;
    }

    async searchFocus() {
        this.searchField.nativeElement.className = 'focus';
        this.searchResults = await this.dataSvc.searchQuery('civic');
        this.searchQuery = 'civic';
    }

    searchBlur() {
        this.searchField.nativeElement.className = '';
    }

    async searchTyping(value: string) {
        if (value.length < 2) return;

        this.searchQuery = value;
        this.searchResults = await this.dataSvc.searchQuery(value);
    }
}
