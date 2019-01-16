import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit {

  public initiativeType: string;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {

    this._route.params.subscribe(params => {

      this.initiativeType = params['key'];
      document.getElementById('initiative-bg').classList.value = this.initiativeType;
      // document.body.classList.value = this.initiativeType;
      document.getElementById('initiative-bg').style.display = 'block';
      document.getElementById('initiative-bg').parentNode = document.getRootNode();

        // this._dataSvc.getDataForUrl('initiatives/get/' + params['key']).subscribe(response => {
        // });

    });
  }

  ngOnInit() {
  }

}
