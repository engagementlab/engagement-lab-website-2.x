import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { DataService } from '../utils/data.service';
import { filter } from 'rxjs/operators';

import { TimelineLite, Circ, TweenLite } from "gsap";
import { environment } from '../../environments/environment';
import * as _ from 'underscore';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {

  public navLinks: object[] = [
      {url: 'about', label: 'About'},
      {url: 'projects', label: 'Projects'},
      {url: 'publications', label: 'Publications'},
      {url: 'masters', label: 'Masters Program'},
      {url: 'getinvolved', label: 'Get Involved'}
  ];
  public searchResults: any[];
  public isProduction: boolean;

  private tl: TimelineLite; 
  private btn: HTMLElement;
  
  private wasLoading: boolean = false;
  private currentUrl: string;

  @ViewChild('searchField') searchField: ElementRef;
  @ViewChild('menuLinks') menuLinks: ElementRef;

  constructor(private _router: Router, private _dataSvc: DataService) {

    // Get nav route when nav ends
    _router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.currentUrl = _router.url;
    });

		this._dataSvc.isLoading.subscribe( value => {
        if(this.wasLoading && !value) {
          if(document.getElementById('menu-btn').classList.contains('open')) 
              this.tl.reverse();
        }
            
        this.wasLoading = value;

    });
  
    this.isProduction = environment.production;
  
  }

  ngAfterViewInit() {

  	let menu = document.getElementById('menu');
    let show = document.querySelector('#menu-btn .close');
    let hide = document.querySelector('#menu-btn .open');

    this.btn = document.getElementById('menu-btn');
   	this.tl = new TimelineLite({paused:true, reversed:true, onReverseComplete:() => {
      menu.querySelectorAll('h3 a').forEach((el: HTMLElement) => {
        el.classList.remove('visible');
      });
    }});
    
  	let tl = this.tl;

    tl.add('start');
    tl.set([document.getElementById('nav'), this.btn], {className:'+=open'}, 'start');
    
    tl.fromTo(show, .7, {xPercent:100, autoAlpha:0}, { xPercent:0, autoAlpha:1, ease:Circ.easeOut});
    tl.fromTo(hide, .7, {xPercent:0, autoAlpha:1}, { xPercent:100, autoAlpha:0, ease:Circ.easeOut}, '-=.7');

    tl.fromTo(menu, .7, {autoAlpha:0}, {autoAlpha:1, display:'flex', ease:Circ.easeOut}, '-=.7');
    tl.fromTo(document.getElementById('menu-overlay'), .5, {autoAlpha:0, display:'none'}, {autoAlpha:1, display:'block'}, '-=.7');

    tl.staggerFromTo(menu.querySelectorAll('h3'), .2, {autoAlpha:0, yPercent:-20}, {autoAlpha:1, yPercent:0}, .1, '-=.5', () => {
      menu.querySelectorAll('h3 a').forEach((el: HTMLElement) => {
        el.classList.add('visible');
      });
    });

  }

  openCloseNav() {

    if(!this.tl.reversed()) {
      this.tl.reverse().timeScale(1.3);
      
      this.searchField.nativeElement.value = '';
      this.searchResults = null;
    }
    else
      this.tl.play();

  }

  // Is passed route active?
  itemActive(route: string) {

    return '/'+route == this.currentUrl;

  }

  // If on home when logo clicked, just close menu
  logoClick() {

    if(this.currentUrl === '/')
      this.openCloseNav();

  }

  searchFocus() {

    TweenLite.to(this.menuLinks.nativeElement, .4, {height:0, autoAlpha:0});

    this.searchField.nativeElement.className = 'focus';

  }

  searchBlur() {

    TweenLite.to(this.menuLinks.nativeElement, .4, {height:'auto', autoAlpha:1});

    this.searchField.nativeElement.className = '';
    
  }


  searchTyping(value: string) {

    if(value.length < 1)
      this.searchResults = null;

    // if(value.length < 3) return;

    this._dataSvc.getDataForUrl('all/'+value, true).subscribe(response => {
      
      _.each(response, (result) => {
        result._source.name = result._source.name.replace(new RegExp(value, 'gi'), '<span style="color:black">$&</span>');
      });
      this.searchResults = response;
        
    });

  }

}
