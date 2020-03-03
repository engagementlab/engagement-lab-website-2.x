import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isQABuild: boolean;
  title = 'Engagement Lab @ Emerson College';

  constructor(private _router: Router, private _titleSvc: Title) {

    this.isQABuild = environment.qa;
    this._titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);

   }
 
  ngOnInit() {

    this._router.events.subscribe((evt) => {

      if (!(evt instanceof NavigationEnd))
        return;
        
      // Reset relevant initiative page elements by default
      document.getElementById('logo-img').classList.remove('white');
      if(!evt.url.includes('initiatives'))
        document.getElementById('initiative-bg').classList.value = '';

      if(evt.url.indexOf('/#') === 0)
        return;

      // Always go to top of page
      window.scrollTo(0, 0);

    });
  }
}
