import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { DataService } from '../../utils/data.service';

// "Slider nav"
export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37,
}

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
    public content: any;

    public next: any;

    public previous: any;

    public hidden = true;

    public redirecting: boolean;

    public projectKey: string;

    private subscriber: Subscription;

    constructor(
        private dataSvc: DataService,
        private route: ActivatedRoute,
        private _router: Router,
    ) {
        this.subscriber = _router.events.subscribe(async e => {
            if (!(e instanceof NavigationEnd)) return;

            const { key } = this.route.snapshot.params;

            // Force content reset
            this.content = undefined;

            // Redirect if user tried old url format
            if (this.route.snapshot.params.category !== undefined) {
                this.redirecting = true;

                this.projectKey = key;

                setTimeout(() => {
                    window.location.href = `/research/projects/${key}`;
                }, 4200);
                return;
            }

            const query = `
                {
                    getProject(key: "${key}") {
                        project {
                            challengeTxt 
                            customUrl
                            externalLinkUrl 
                            files {
                                name
                                file {
                                    url
                                }
                            }
                            githubUrl 
                            image {
                                public_id 
                            }
                            key
                            name
                            projectImages {
                                public_id
                            } 
                            projectType 
                            resultsTxt 
                            showFiles
                            sortOrder
                            strategyTxt 
                            startYear
                            endYear
                            partners {
                                name
                            }
                            projectLeads
                            teamMembers
                            primaryImage {
                                public_id
                            }
                            primaryImageDescription
                            publications {
                                title
                                key
                                date
                                author
                                blurb
                                context
                                downloadUrls
                                purchaseUrls
                            }
                        }
                        prev {
                            name
                            key
                        }
                        next {
                            name
                            key
                        }
                    }
                }
            `;

            const content = await this.dataSvc.getSetWithKey(
                'projects',
                key,
                query,
            );
            if (content) this.setContent(content['getProject']);
        });
    }

    ngOnDestroy(): void {
        // Cancel router subscribe
        this.subscriber.unsubscribe();
    }

    setContent(data: any): void {
        this.content = data.project;
        this.next = data.next;
        this.previous = data.prev;
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            this._router.navigateByUrl(`/projects/${this.next.key}`);
        }
        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            this._router.navigateByUrl(`/projects/${this.previous.key}`);
        }
    }
}
