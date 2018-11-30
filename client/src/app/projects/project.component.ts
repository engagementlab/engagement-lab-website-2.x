import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  private content: any[];

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { 

    this._route.params.subscribe(params => {

      this._dataSvc.getDataForUrl('projects/get/'+params['key']).subscribe(response => {
          this.content = response;    
      });

    });

  }

  ngOnInit() {

    let key = this._route.snapshot.paramMap.get('key');
    this._dataSvc.getDataForUrl('projects/get/'+key).subscribe(response => {
        this.content = response;    
    });

  }

}
