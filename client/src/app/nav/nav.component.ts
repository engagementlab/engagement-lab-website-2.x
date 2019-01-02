import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { DataService } from '../utils/data.service';

import { filter } from 'rxjs/operators';

import { TimelineLite, Circ, Linear, TweenMax } from "gsap";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  tl: TimelineLite; 
  btn: HTMLElement;
  
  private wasLoading: boolean = false;

  constructor(private _router: Router, private _dataSvc: DataService) {

    // Hide nav when nav occurs
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      // if(document.getElementById('menu-btn').classList.contains('open'))
        // this.tl.reverse();
    });

		this._dataSvc.isLoading.subscribe( value => {
      if(this.wasLoading && !value) {
        if(document.getElementById('menu-btn').classList.contains('open')) 
            this.tl.reverse();
          // this.tlLogo.pause(0);
      }
          
      this.wasLoading = value;
      if(value) {
        // this.tlLogo.play();
      }

  } );
  
  }

  ngOnInit() {

    this.btn = document.getElementById('menu-btn');
   	this.tl = new TimelineLite({paused:true, reversed:true});
    
  	let tl = this.tl;
  	let navEl = document.getElementById('menu');
    let show = document.querySelector('#menu-btn .close');
    let hide = document.querySelector('#menu-btn .open');

    tl.add('start');
    tl.set(this.btn, {className:'+=open'}, 'start');
    
    tl.fromTo(show, .7, {xPercent:100, autoAlpha:0}, { xPercent:0, autoAlpha:1, ease:Circ.easeOut});
    tl.fromTo(hide, .7, {xPercent:0, autoAlpha:1}, { xPercent:100, autoAlpha:0, ease:Circ.easeOut}, '-=.7');

    tl.fromTo(navEl, .7, {autoAlpha:0}, {autoAlpha:1, display:'flex', ease:Circ.easeOut}, '-=.7');
    tl.fromTo(document.getElementById('menu-overlay'), .5, {autoAlpha:0, display:'none'}, {autoAlpha:1, display:'block'}, '-=.7');


    /* var i = {x: -425};
    var gradient      = document.getElementById('gradient');
    this.tlLogo = TweenMax.to(i, 5, {score:"+=850", onUpdate:() => {
      gradient.setAttribute('gradientTransform', 'translate('+i.x+')');
    }, ease:Linear.easeNone, paused: true}); */
  }

  openNav() {

    // this.btn.classList.toggle('open');
    if(!this.tl.reversed())
      this.tl.reverse();
    else
      this.tl.play();

  }

}
