import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class GraduateProjectComponent implements OnInit {
    public content: any;
    public next: any;
    public previous: any;

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

            const query = `{
                getMDProject(key: "${key}") {
                    project {
                        key
                        name
                        externalLinkUrl 
                        problem
                        intervention
                        impact
                        thumb {
                            public_id 
                        }
                        thesis {
                            url
                            name
                        }
                        resources {
                            url
                            name
                        }
                        publications 
                        {
                            title
                            key
                            date
                            author
                            blurb
                            context
                            downloadUrls
                            purchaseUrls
                        }
                        pointOfContact {
                            key
                            name {
                                first
                                last
                            }
                        }
                        projectImages {
                            public_id 
                        }
                        cohortYear {
                            label
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

            const response = await this.dataSvc.getSetWithKey(
                'grad-projects',
                key,
                query,
            );

            this.content = response['getMDProject']['project'];
        });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        // Cancel router subscribe
        this.subscriber.unsubscribe();
    }
}
