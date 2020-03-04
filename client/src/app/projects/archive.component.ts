import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ProjectArchiveComponent implements OnInit {

  public projectsArchived: any[];
  
  constructor(private _dataSvc: DataService) { 
    
/*     this._dataSvc.getSet('projects/get/archived/').subscribe(response => {
        this.projectsArchived = response;
    });
   */
  }

  ngOnInit() {}

}
