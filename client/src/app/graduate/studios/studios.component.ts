import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChildren,
    QueryList,
} from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

import mixitup from 'mixitup';

@Component({
    selector: 'app-studios',
    templateUrl: './studios.component.html',
    styleUrls: ['./studios.component.scss'],
})
export class GraduateStudiosComponent implements OnInit, AfterViewInit {
    public content: any;
    public cohorts: any;
    public projects: any;
    public currentSelector: string;

    @ViewChildren('projectList') projectList: QueryList<any>;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const query = `
        {
            allMastersPages {
              studiosBlurb
            }
            allCohorts {
              key
              name
            }
            allMDProjectPages {
              key
              name
              thumb {
                public_id
              }
              cohortYear {
                  key  
              }
            }
        }
    `;

        const mastersResponse = await this.dataSvc.getSetWithKey(
            'graduate',
            'studios',
            query,
        );
        this.content = mastersResponse['allMastersPages'];
        this.cohorts = mastersResponse['allCohorts'];
        this.projects = mastersResponse['allMDProjectPages'];
    }

    ngAfterViewInit() {
        this.projectList.changes.subscribe(t => {
            if (this.projects.length % 2 === 1) {
                this.projects.push({
                    projectType: 'dummy',
                    key: 'dummy',
                    cohortYear: { key: 'dummy' },
                });
            }
        });
    }
    public applySelector(selector: string) {
        this.currentSelector = selector;
    }

    public isSelected(selector: string) {
        return (
            !this.currentSelector || this.currentSelector.indexOf(selector) > -1
        );
    }
}
