import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { ActivatedRoute } from '@angular/router';
import { TweenLite } from 'gsap';

import * as AOS from 'aos';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit {

  public initiativeType: string;
  public content: any;

  private upperBg: HTMLElement;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {

    this.upperBg = document.getElementById('initiative-bg');
    this._route.params.subscribe(params => {

      this.initiativeType = params['key'];

      this._dataSvc.getDataForUrl('initiative/get/'+this.initiativeType).subscribe(response => {

        this.content = response;

        this.upperBg.classList.value = this.initiativeType;
        TweenLite.fromTo(this.upperBg, 1, {autoAlpha:0}, {autoAlpha:1, display:'block', delay:1});
        
        document.getElementById('logo-img').classList.add('white');

        AOS.init({
          mirror: true
        });
        
      });

    });
  }

  ngOnInit() {
  }

}
