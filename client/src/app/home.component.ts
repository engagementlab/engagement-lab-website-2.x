import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from './utils/data.service';

import * as AOS from 'aos';
import * as Warp from 'warpjs';
// import * as spiralFactory from 'warpjs/src/warp'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public initiatives: any[];
  public featuredProjects: any[];
  public events: any[];

  @ViewChildren('initiativeList') initiativeList: QueryList<any>;

  constructor(private _dataSvc: DataService) {  }

  ngOnInit() {

    this._dataSvc.getDataForUrl('homepage/get/').subscribe(response => {
      this.initiatives = response.initiatives;    
      this.featuredProjects = response.projects;    
      this.events = response.events;    
    });

  }

  ngAfterViewInit() {

    this.initiativeList.changes.subscribe(t => {
        // AOS.init();
    });

    let pointCount = 0;
    let mouseX = 0
    let mouseY = 0
    let lastMouseX = 0
    let lastMouseY = 0
    let mouseDeltaX = 0
    let mouseDeltaY = 0

    const svg = document.querySelector('#red svg')
    const warp = new Warp(svg)

const svgPos = svg.getBoundingClientRect()
const originX = svgPos.left
const originY = svgPos.top
let brushSize = 25
    warp.interpolate(8)
    warp.transform(([ x, y ]) => [ x, y, y]);
    let offset = 0
    function animate()
    {
      // let factor = Math.floor(Math.random() * (17 - 16 + 1) + 16);
      // // warp.transform(([ x, y, oy ]) => [ x, oy + 1 * Math.sin(x / 20 + offset), oy ])
      //  warp.transform(([ x, y, oy ]) => [ x + 1, y, oy ]);
      //   offset += 0.09

        pointCount = 0
        warp.transform(function(points)
        {
          pointCount++
          return smudge(points)
        })
        requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', function(e)
    {
      mouseX = e.clientX
      mouseY = e.clientY
      mouseDeltaX = mouseX - lastMouseX
      mouseDeltaY = mouseY - lastMouseY
      lastMouseX = mouseX
      lastMouseY = mouseY
    })

    function smudge([x, y])
    {
      const pointX = x + originX
      const pointY = y + originY
      const deltaX = mouseX - pointX
      const deltaY = mouseY - pointY
      const delta = Math.sqrt(deltaX**2 + deltaY**2)

      if(delta <= brushSize)
      {
        x += mouseDeltaX * ((brushSize - delta) / brushSize)
        y += mouseDeltaY * ((brushSize - delta) / brushSize)
      }
      
      return [x, y]
    }


    // window.addEventListener("mousemove", function(e) {
    //   requestAnimationFrame(function() {
    //     let  p = f, y = 0, f = e.clientX, d = e.clientY
    //       var e = s.getBoundingClientRect();
    //       warp.transform(a(p - e.left, y - e.top, f - e.left, d - e.top, 100, .33))
    //   })

    animate()



  }

}
