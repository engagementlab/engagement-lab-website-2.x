import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock';
import { DataService } from '../utils/data.service';

import { environment } from '../../environments/environment';

interface Link {
    url: string;
    label: string;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    public navLinks: Link[] = [
        { url: 'about', label: 'About' },
        { url: 'projects', label: 'Projects' },
        { url: 'publications', label: 'Publications' },
        { url: 'masters', label: 'Masters Program' },
        { url: 'getinvolved', label: 'Get Involved' }
    ];

    public searchResults: unknown[];

    public searchEnabled: boolean;

    public logoSm: boolean;

    private wasLoading = false;

    private currentUrl: string;

    @ViewChild('nav') nav: ElementRef;

    @ViewChild('searchField') searchField: ElementRef;

    @ViewChild('menuLinks') menuLinks: ElementRef;

    @ViewChild('home') homeLogo: ElementRef;

    @ViewChild('menu') menu: ElementRef;

    @ViewChild('menuBtn') menuBtn: ElementRef;

    @ViewChild('menuOpen') menuBtnOpen: ElementRef;

    @ViewChild('menuClose') menuBtnClose: ElementRef;

    constructor(private _router: Router, private _dataSvc: DataService) {
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
                if (this.menuBtn.nativeElement.classList.contains('isOpen'))
                    this.openCloseNav();
            });

        this._dataSvc.isLoading.subscribe(value => {
            this.wasLoading = value;
        });

        this.searchEnabled = environment.searchEnabled;
    }

    openCloseNav(): void {
        this.menuBtn.nativeElement.classList.toggle('isOpen');
        this.menu.nativeElement.classList.toggle('isOpen');
        this.menu.nativeElement.classList.add('wasOpened');

        const overlay = document.getElementById('menu-overlay');
        overlay.classList.toggle('open');

        // Nav is being closed...
        // This makes it so overlay/label does not do fade out on app load
        if (!overlay.classList.contains('open')) {
            overlay.classList.add('wasOpened');
            this.menuBtnClose.nativeElement.classList.add('wasOpened');

            enableBodyScroll(this.nav.nativeElement);
        }
        // ...opened
        else disableBodyScroll(this.nav.nativeElement);
    }

    // Is passed route active?
    itemActive(route: string) {
        return `/${route}` == this.currentUrl;
    }

    // If on home when logo clicked, just close menu
    logoClick() {
        if (this.currentUrl === '/') this.openCloseNav();
    }

    searchFocus() {
        this.searchField.nativeElement.className = 'focus';
    }

    searchBlur() {
        this.searchField.nativeElement.className = '';
    }

    async searchTyping(value: string) {
        if (value.length < 3) return;

        this.searchResults = await this._dataSvc.getSet('search', value);
    }
}
