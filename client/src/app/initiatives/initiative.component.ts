import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { ActivatedRoute } from '@angular/router';
import { TweenLite } from 'gsap';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit {

  public initiativeType: string;
  public content: any;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {

    this._route.params.subscribe(params => {

      this.initiativeType = params['key'];

      this._dataSvc.getDataForUrl('initiative/get/'+this.initiativeType).subscribe(response => {

        this.content = response;

        document.getElementById('initiative-bg').classList.value = this.initiativeType;
        document.getElementById('logo-img').classList.add('white');
        TweenLite.fromTo(document.getElementById('initiative-bg'), 2, {autoAlpha:0}, {autoAlpha:1, display:'block', delay:1});
        
      });

    });
  }

  ngOnInit() {
  }

}
