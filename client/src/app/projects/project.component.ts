import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { DataService } from '../utils/data.service';

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

    public themeIndex: number;

    public themeIndexNext: number;

    public themeIndexPrevious: number;

    private themeColors: string[] = [
        '246, 165, 54',
        '0, 171, 158',
        '247, 41, 35',
    ];

    public hidden = true;

    public redirecting: boolean;

    public projectKey: string;

    private bgEndPerc: number;

    private bgAlpha = 0;

    private alphaInterval: any;

    private bgInterval: any;

    private bgTimeout: any;

    private subscriber: Subscription;

    @ViewChild('backgroundEnd') backgroundEnd: ElementRef;

    @ViewChild('description') description: ElementRef;

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
                    window.location.href = `projects/${key}`;
                }, 4200);
                return;
            }

            const query = `
                {
                    getProject(key: "${key}") {
                        project {
                            byline 
                            challengeTxt 
                            customUrl 
                            description 
                            externalLinkUrl 
                            files {
                                url
                                name
                            }
                            githubUrl 
                            image {
                                public_id 
                            }
                            key
                            name
                            name 
                            projectImages {
                                public_id
                            } 
                            projectType 
                            resultsTxt 
                            showFiles
                            sortOrder
                            strategyTxt 
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
            // const content = await this._dataSvc.getSet('projects', key);
            if (content) this.setContent(content['getProject']);
            this.bgAlpha = 0;
            this.alphaInterval = setInterval(() => {
                this.bgAlpha += 0.015;
                if (this.bgAlpha >= 1) clearInterval(this.alphaInterval);
            }, 15);
        });
    }

    ngOnDestroy(): void {
        // Reset BG
        document.body.style.backgroundImage = '';

        // Cancel timers for bg
        clearInterval(this.alphaInterval);
        clearInterval(this.bgInterval);
        clearTimeout(this.bgTimeout);

        // Cancel router subscribe
        this.subscriber.unsubscribe();
    }

    setContent(data: any): void {
        this.content = data.project;
        this.next = data.next;
        this.previous = data.prev;

        this.themeIndex = data.project.sortOrder % 3;
        if (this.next) this.themeIndexNext = this.next.sortOrder % 3;
        if (this.previous) {
            this.themeIndexPrevious = this.previous.sortOrder % 3;
        }

        this.setBgHeight();

        // Fade in
        this.alphaInterval = setInterval(() => {
            this.bgAlpha += 0.015;
            if (this.bgAlpha >= 1) clearInterval(this.alphaInterval);
        }, 15);
    }

    setBgHeight(): void {
        // Run every 1ms for 3s for the end of gradient always end at desired % after full page load
        // This is slightly hacky but the only way to really ensure proper render.
        this.bgInterval = setInterval(() => {
            if (
                this.backgroundEnd === undefined ||
                this.description === undefined
            ) {
                return;
            }

            const endY =
                this.backgroundEnd.nativeElement.offsetTop +
                this.backgroundEnd.nativeElement.offsetHeight;
            const windowHeight = document.body.clientHeight;
            this.bgEndPerc = (endY / windowHeight) * 100;
            const color = this.themeColors[this.themeIndex];

            // Skip bg fade if coming from other project, only adjust height
            // if (this._dataSvc.previousUrl && this._dataSvc.previousUrl.split('/projects')[1]) {
            document.body.style.backgroundImage = `linear-gradient(
                to bottom, 
                rgba(${color}, ${this.bgAlpha}) 0%, 
                rgba(${color}, ${this.bgAlpha}) ${this.bgEndPerc}%, 
                white ${this.bgEndPerc}%, 
                white 100%)`;
        }, 1);

        // Cancel soon
        this.bgTimeout = setTimeout(() => {
            clearInterval(this.bgInterval);
        }, 3000);
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
