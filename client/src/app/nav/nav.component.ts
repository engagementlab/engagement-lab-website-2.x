import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { DataService } from '../utils/data.service';
import { filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { TimelineLite, Circ } from 'gsap/src/all';
import * as _ from 'underscore';

interface Link {
    url: string;
    label: string;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements AfterViewInit {
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

    private wasLoading = false;
    private currentUrl: string;

    private tl: TimelineLite;

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
            if (this.menuBtn.nativeElement.classList.contains('open')) this.tl.reverse();
        });

        this._dataSvc.isLoading.subscribe(value => {
            this.wasLoading = value;
        });

        this.searchEnabled = environment.searchEnabled;
    }

    ngAfterViewInit() {
        this.tl = new TimelineLite({
            paused: true,
            reversed: true,
            onReverseComplete: () => {
                this.menu.nativeElement.querySelectorAll('h3 a').forEach((el: HTMLElement) => {
                    el.classList.remove('visible');
                });
            },
        });

        const tl = this.tl;

        tl.add('start');
        // tl.set([], {className:'+=open'}, 'start');

        tl.fromTo(
            this.menuBtnClose.nativeElement,
            0.7,
            { xPercent: 100, autoAlpha: 0 },
            { xPercent: 0, autoAlpha: 1, ease: Circ.easeOut },
        );
        tl.fromTo(
            this.menuBtnOpen.nativeElement,
            0.7,
            { xPercent: 0, autoAlpha: 1 },
            { xPercent: 100, autoAlpha: 0, ease: Circ.easeOut },
            '-=.7',
        );

        tl.fromTo(
            this.menu.nativeElement,
            0.7,
            { autoAlpha: 0 },
            { autoAlpha: 1, display: 'flex', ease: Circ.easeOut },
            '-=.7',
        );
        tl.fromTo(
            document.getElementById('menu-overlay'),
            0.5,
            { autoAlpha: 0, display: 'none' },
            { autoAlpha: 1, display: 'block' },
            '-=.7',
        );

        // this.tl.staggerFromTo(
        //     this.menu.nativeElement.querySelectorAll('h3'),
        //     0.2,
        //     { autoAlpha: 0, yPercent: -20 },
        //     { autoAlpha: 1, yPercent: 0 },
        //     0.1,
        //     '-=.5',
        //     () => {
        //         this.menu.nativeElement.querySelectorAll('h3 a').forEach((el: HTMLElement) => {
        //             el.classList.add('visible');
        //         });
        //     },
        // );
    }

    openCloseNav() {
        if (!this.tl.reversed()) {
            this.nav.nativeElement.classList.remove('open');
            this.menuBtn.nativeElement.classList.remove('open');

            this.tl.reverse().timeScale(1.3);
            this.searchField.nativeElement.value = '';
            this.searchResults = null;
        } else {
            this.nav.nativeElement.classList.add('open');
            this.menuBtn.nativeElement.classList.add('open');

            this.tl.play();
        }
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
