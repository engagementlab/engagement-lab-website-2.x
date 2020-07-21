import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../utils/data.service';

@Component({
    selector: 'projects-index',
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

    @ViewChildren('projectList') projectList: QueryList<any>;

    // eslint-disable-next-line no-useless-constructor
    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allProjectPages {
                    name
                    key
                    image {
                        public_id
                    }
                }
                allArchivedProjectPages {
                    name
                    key
                }
                allFeaturedProjectPages {
                    name
                    key
                }
            }
        `;

        const content = await this.dataSvc.getSet('projects', query);

        this.projects = content['allProjectPages'];
        this.projectsArchived = content['allArchivedProjectPages'];
        this.projectFeatured = content['allFeaturedProjectPages'];
    }

    ngAfterViewInit() {
        this.projectList.changes.subscribe(t => {
            if (this.projects.length % 2 === 1) {
                this.projects.push({ projectType: 'dummy', key: 'dummy' });
            }
        });
    }

    // ngOnDestroy() {
    //     // Destroy mixer when user leaves
    //     if(this.mixer)
    //       this.mixer.destroy();
    // }
}
