import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';

import { TimelineLite, Circ, TweenLite } from "gsap";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	tl: TimelineLite; 

  constructor(private _router: Router) { 
  
    // Hide nav when nav occurs
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      if(document.getElementById('menu-btn').classList.contains('open'))
        this.tl.reverse();
    });
  
  }

  ngOnInit() {


   	this.tl = new TimelineLite({paused:true, reversed:true});
    
  	let tl = this.tl;
  	// let open = document.getElementById('open');
    // let close = document.getElementById('close');
  	// let home = document.getElementById(ismobile.phone ? 'home-mobile' : 'home');
  	let navEl = document.getElementById('menu');

    // TweenLite.set(open, {transformStyle:'preserve-3d'});
    // TweenLite.set(close, {transformStyle:'preserve-3d'});
  	// tl.fromTo(open, .1, {autoAlpha:1}, {autoAlpha:0, rotationY:90});
    // tl.fromTo(close, .2, {autoAlpha:0, rotationY:90}, {autoAlpha:1, rotationY:0, display:'block'}, '+=0.1');
    tl.fromTo(navEl, .7, {yPercent:-100}, { yPercent:0, display:'flex', ease:Circ.easeOut}, '+=.01');
    tl.fromTo(document.getElementById('menu-overlay'), .4, {autoAlpha:0, display:'none'}, {autoAlpha:.97, display:'block'}, '-=.7');
    tl.set([navEl, document.getElementById('menu-btn')], {css:{position:'fixed'}});

  }

  openNav() {

    let btn = document.getElementById('menu-btn');
    
    btn.classList.toggle('open');
    let opened = btn.classList.contains('open');
    let show = document.querySelector('#menu-btn .' + (opened ? 'close': 'open'));
    let hide = document.querySelector('#menu-btn .' + (!opened ? 'close': 'open'));
    
    TweenLite.fromTo(show, .7, {xPercent:100, autoAlpha:0}, { xPercent:0, autoAlpha:1, ease:Circ.easeOut});
    TweenLite.fromTo(hide, .7, {xPercent:0, autoAlpha:1}, { xPercent:100, autoAlpha:0, ease:Circ.easeOut});
    if(!this.tl.reversed())
      this.tl.reverse();
    else
      this.tl.play();

  }

}
