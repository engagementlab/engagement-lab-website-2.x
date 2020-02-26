import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { DataService } from '../utils/data.service';
import { filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import * as _ from 'underscore';

interface Link {
  url: string,
  label: string,
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements AfterViewInit {

  public navLinks: Link[] = [
      {url: 'about', label: 'About'},
      {url: 'projects', label: 'Projects'},
      {url: 'publications', label: 'Publications'},
      {url: 'masters', label: 'Masters Program'},
      {url: 'getinvolved', label: 'Get Involved'}
  ];
  public searchResults: any[];
  public searchEnabled: boolean;

  private btn: HTMLElement;
  
  private wasLoading: boolean = false;
  private currentUrl: string;

  @ViewChild('searchField') searchField: ElementRef;
  @ViewChild('menuLinks') menuLinks: ElementRef;
  @ViewChild('home') homeLogo: ElementRef;

  constructor(private _router: Router, private _dataSvc: DataService) {

    // Get nav route when nav ends
    _router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.currentUrl = _router.url;

      // Adjust logo size based on page
      let classes = this.homeLogo.nativeElement.classList;
      if(classes) {
        if(this.currentUrl === '/')
          classes.remove('sm');
        else
          classes.add('sm');
      }
    });

		this._dataSvc.isLoading.subscribe( value => {
            
        this.wasLoading = value;

    });
  
    this.searchEnabled = environment.searchEnabled;
  
  }

  ngAfterViewInit() {

  	// let menu = document.getElementById('menu');
    // let show = document.querySelector('#menu-btn .close');
    // let hide = document.querySelector('#menu-btn .open');


  }

  openCloseNav() {
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

    this.searchField.nativeElement.className = 'focus';

  }

  searchBlur() {

    this.searchField.nativeElement.className = '';
    
  }


  searchTyping(value: string) {

    if(value.length < 1)
      this.searchResults = null;

    // if(value.length < 3) return;

    this._dataSvc.getDataForUrl('search/all/'+value, true).subscribe(response => {
      
      this.searchResults = response;
        
    });

  }

}
