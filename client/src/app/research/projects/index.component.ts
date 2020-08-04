import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../../utils/data.service';

import mixitup from 'mixitup';

@Component({
    selector: 'projects-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class ProjectIndexComponent implements OnInit {
    public researchBlurb: string;
    public initiatives: any;
    public projects: any[];

    public projectFeatured: any;

    public projectsArchived: any[];

    public projectTypeNames: string[];

    public projectTypesCount: Record<string, any>;

    public projectTypesTotal: number;

    @ViewChildren('projectList') projectList: QueryList<any>;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allResearchPages {
                    blurb
                }
                allInitiativePages {
                    name
                    key
                }
                allProjectPages {
                    name
                    key
                    customUrl
                    image {
                        public_id
                    }
                    initiatives {
                        key
                    }
                    status
                }
                allArchivedProjectPages {
                    name
                    key
                }
            }
        `;

        const content = await this.dataSvc.getSet('projects', query);

        this.projects = content['allProjectPages'];
        this.projectsArchived = content['allArchivedProjectPages'];
        this.projectFeatured = content['allFeaturedProjectPages'];
        this.initiatives = content['allInitiativePages'];
        this.researchBlurb = content['allResearchPages'].blurb;
    }

    ngAfterViewInit() {
        this.projectList.changes.subscribe(t => {
            if (this.projects.length % 2 === 1) {
                this.projects.push({ projectType: 'dummy', key: 'dummy' });
            }

            // Init mixitup filtering
            mixitup(document.getElementById('projects'), {
                animation: {
                    effects: 'fade',
                },
                controls: {
                    toggleLogic: 'and',
                },
            });
        });
    }

    // ngOnDestroy() {
    //     // Destroy mixer when user leaves
    //     if(this.mixer)
    //       this.mixer.destroy();
    // }
}
