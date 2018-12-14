import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public content: any;
  public themeIndex: number;
  private projectBgEl: HTMLElement;

  @ViewChild('backgroundEnd') backgroundEnd: ElementRef;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { 

    this._route.params.subscribe(params => {

      this._dataSvc.getDataForUrl('projects/get/'+params['key']).subscribe(response => {
          this.setContent(response);   
      });

    });

  }

  ngOnInit() {

    let key = this._route.snapshot.paramMap.get('key');
    this._dataSvc.getDataForUrl('projects/get/'+key).subscribe(response => {
      this.setContent(response);    
    });

  }

  ngAfterViewChecked() {
    
    this.setBgHeight();

  }
   
  setContent(data: any) {

    this.projectBgEl = document.getElementById('project-bg');

    this.content = data;
    this.themeIndex = data['sortOrder'] % 3;

    this.projectBgEl.removeAttribute('class');
    this.projectBgEl.setAttribute('class', 'show index-'+this.themeIndex);
    
  }

  setBgHeight() {

    if(this.projectBgEl === undefined) return;

    let height = (this.backgroundEnd.nativeElement.offsetTop + this.backgroundEnd.nativeElement.offsetHeight) - window.scrollY+'px';
    this.projectBgEl.style.maxHeight = height;
    this.projectBgEl.style.height = height;

  }

  // Update bg height on scroll
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      
      this.setBgHeight();

    }

}
