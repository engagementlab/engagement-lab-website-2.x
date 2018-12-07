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
  btn: HTMLElement;

  constructor(private _router: Router) { 
  
    // Hide nav when nav occurs
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      if(document.getElementById('menu-btn').classList.contains('open'))
        this.tl.reverse();
    });
  
  }

  ngOnInit() {

    this.btn = document.getElementById('menu-btn');
   	this.tl = new TimelineLite({paused:true, reversed:true});
    
  	let tl = this.tl;
  	let navEl = document.getElementById('menu');
    // let opened = this.btn.classList.contains('open');
    let show = document.querySelector('#menu-btn .close');
    let hide = document.querySelector('#menu-btn .open');

    // tl.set([navEl, document.getElementById('menu-btn')], {css:{position:'fixed'}});
    tl.add('start');
    tl.set(this.btn, {className:'+=open'}, 'start');
    
    tl.fromTo(show, .7, {xPercent:100, autoAlpha:0}, { xPercent:0, autoAlpha:1, ease:Circ.easeOut});
    tl.fromTo(hide, .7, {xPercent:0, autoAlpha:1}, { xPercent:100, autoAlpha:0, ease:Circ.easeOut}, '-=.7');

    tl.fromTo(navEl, .7, {autoAlpha:0}, {autoAlpha:1, display:'flex', ease:Circ.easeOut}, '-=.7');
    tl.fromTo(document.getElementById('menu-overlay'), .5, {autoAlpha:0, display:'none'}, {autoAlpha:1, display:'block'}, '-=.7');

  }

  openNav() {

    // this.btn.classList.toggle('open');
    if(!this.tl.reversed())
      this.tl.reverse();
    else
      this.tl.play();

  }

}
