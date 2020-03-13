import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { DataService } from '../utils/data.service';
import { filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';

interface Link {
    url: string;
    label: string;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    public navLinks: Link[] = [
        { url: 'about', label: 'About' },
        { url: 'projects', label: 'Projects' },
        { url: 'publications', label: 'Publications' },
        { url: 'masters', label: 'Masters Program' },
        { url: 'getinvolved', label: 'Get Involved' },
    ];
    public searchResults: any[];
    public searchEnabled: boolean;
    public logoSm: boolean;
    public menuEnabled: boolean;

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
        this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
            this.currentUrl = this._router.url;

            // Adjust logo size based on page
            this.logoSm = this.currentUrl !== '/';
        });

        _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
            // Close menu when nav starts
            if (this.menuBtn.nativeElement.classList.contains('isOpen')) this.openCloseNav();
        });

        this._dataSvc.isLoading.subscribe(value => {
            this.wasLoading = value;
        });

        this.searchEnabled = environment.searchEnabled;

        setTimeout(() => {
            this.menuEnabled = true;
        }, 15000);
    }

    openCloseNav(): void {
        this.menuBtn.nativeElement.classList.toggle('isOpen');
        this.menu.nativeElement.classList.toggle('isOpen');
        this.menu.nativeElement.classList.add('wasOpened');

        document.getElementById('menu-overlay').classList.toggle('open');
    }

    // Is passed route active?
    itemActive(route: string) {
        return '/' + route == this.currentUrl;
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

    searchTyping(value: string) {
        if (value.length < 1) this.searchResults = null;

        // if(value.length < 3) return;

        /*     this._dataSvc.getSet('search/all/'+value, null, true).subscribe(response => {
      
      this.searchResults = response;
        
    }); */
    }
}
