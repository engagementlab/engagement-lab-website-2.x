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
  private themeColors: string[] = ['#f6a536', '#00ab9e', '#f72923'];

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
    // this._dataSvc.getDataForUrl('projects/get/'+key).subscribe(response => {
    //   this.setContent(response);    
    // });

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

    let endY = this.backgroundEnd.nativeElement.offsetTop + this.backgroundEnd.nativeElement.offsetHeight;
    let heightVal = document.body.clientHeight;
    let perc = (endY / heightVal) * 100;
    let color = this.themeColors[this.themeIndex];

    document.body.style.backgroundImage = 'linear-gradient(to bottom, ' + color + ' 0%, ' + color + ' ' + perc + '%, white ' + perc + '%, white 100%)';

  }

  // Update bg height on scroll
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      
      // this.setBgHeight();

    }

}
