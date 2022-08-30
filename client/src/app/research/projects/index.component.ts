import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

import { DataService } from '../../utils/data.service';

import * as _ from 'underscore';

@Component({
    selector: 'projects-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],

    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0)' }),
                animate(
                    '.2s cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                    style({ transform: 'scale(1)', opacity: 1 }),
                ),
            ]),
            transition(':leave', [
                style({ transform: 'scale(1)' }),
                animate(
                    '.2s cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                    style({ transform: 'scale(0)', opacity: 0 }),
                ),
            ]),
        ]),
    ],
})
export class ProjectIndexComponent implements OnInit {
    public researchBlurb: string;
    public currentSelector: string[];
    public currentSelectorKey: string;
    public currentStatusSelector: string;
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
                    featuredProject {
                        key
                    }
                    projects {
                        key
                    }
                }
                allProjectPages {
                    name
                    key
                    customUrl
                    image {
                        public_id
                    }
                    status
                    startYear
                    endYear
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
        });
    }

    public applySelector(selector: string) {
        this.currentSelectorKey = null;
        if (!selector) {
            this.currentSelector = null;
            return;
        }

        this.currentSelectorKey = selector;
        this.currentSelector = _.pluck(
            _.find(this.initiatives, { key: selector })['projects'],
            'key',
        );
    }

    public applyStatusSelector(selector: string) {
        if (!selector) {
            this.currentStatusSelector = null;
            return;
        }
        this.currentStatusSelector = selector;
    }

    public isSelected(selector: string) {
        return (
            !this.currentSelector || this.currentSelector.indexOf(selector) > -1
        );
    }

    public isStatusSelected(selector: string) {
        return (
            !selector ||
            !this.currentStatusSelector ||
            this.currentStatusSelector === selector
        );
    }
}
