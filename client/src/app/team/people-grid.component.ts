import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { tns } from 'tiny-slider';

@Component({
  selector: 'people-grid',
  templateUrl: './people-grid.component.html',
  styleUrls: ['./people-grid.component.scss']
})
export class PeopleGridComponent implements OnInit {
  
  @Input() people: any[];
  @Input() preview: boolean = false;
  @ViewChildren('teamList') list: QueryList<any>;
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    if(!this.preview) return;

    this.list.changes.subscribe(t => {
      var slider = tns({
        container: '#list',
        items: 3,
        slideBy: 1,
        gutter: 28,
        fixedWidth: 270,
        autoplay: false,
        nav: false,
        arrowKeys: true,
        mouseDrag: true,
        controlsContainer: document.getElementById('controls')
      });
    });

  }
}
