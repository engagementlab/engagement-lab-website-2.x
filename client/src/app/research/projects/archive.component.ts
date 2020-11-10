import { Component, OnInit } from '@angular/core';
import { DataService } from '../../utils/data.service';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.scss'],
})
export class ProjectArchiveComponent implements OnInit {
    public projectsArchived: any;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit() {
        this.projectsArchived = await this._dataSvc.getSet(
            'projects',
            'archive',
        );
    }
}
