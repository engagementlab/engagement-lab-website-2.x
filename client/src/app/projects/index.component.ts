import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class ProjectIndexComponent implements OnInit {
    public projects: any[];
    public projectFeatured: any;
    public projectsArchived: any[];
    public projectTypeNames: string[];
    public projectTypesCount: Record<string, any>;
    public projectTypesTotal: number;

    public isPhone: boolean;

    // links$: Observable<any> = this.scully.available$;

    @ViewChildren('projectList') projectList: QueryList<any>;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit() {
        this.projects = await this._dataSvc.getSet('projects');
        // console.log(this.links$);
    }

    ngAfterViewInit() {
        // this.projectList.changes.subscribe(t => {
        //     // this.mixer = mixitup(document.getElementById('projects'), {
        //     //   animation: {
        //     //     effects: 'fade'
        //     //   }
        //     // });
        //   // if not even count of projects, add a dummy once so last one doesn't center
        //   if(this.projects.length % 2 === 1)
        //     this.projects.push({projectType: 'dummy', key: 'dummy'});
        //     // AOS.init();
        // });
    }

    ngOnDestroy() {
        // Destroy mixer when user leaves
        // if(this.mixer)
        //   this.mixer.destroy();
    }
}
