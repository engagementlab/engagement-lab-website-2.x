import { Component, OnInit } from '@angular/core';
// import { TweenLite, TimelineLite } from "gsap";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	// tl: TimelineLite; 

  constructor() { }

  ngOnInit() {


/*   	this.tl = new TimelineLite({paused:true});
    
  	let tl = this.tl;
  	let open = document.getElementById('open');
    let close = document.getElementById('close');
  	// let home = document.getElementById(ismobile.phone ? 'home-mobile' : 'home');
  	let navEl = document.getElementById('menu');

    TweenLite.set(open, {transformStyle:'preserve-3d'});
    TweenLite.set(close, {transformStyle:'preserve-3d'});
  	tl.fromTo(open, .1, {autoAlpha:1}, {autoAlpha:0, rotationY:90});
    tl.fromTo(close, .2, {autoAlpha:0, rotationY:90}, {autoAlpha:1, rotationY:0, display:'block'}, '+=0.1');
    tl.set(close, {css:{zIndex:21}});
    tl.fromTo(navEl, .6, {autoAlpha:0}, {top:0, autoAlpha:1, ease:gsap.Quad.easeOut}, '+=0.1');
 */
  }

  openNav() {

  	document.getElementById('menu-btn').classList.toggle('open');
  	// this.tl.play();

  }

}
