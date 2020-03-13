import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { DataService } from '../utils/data.service';
import { isScullyGenerated } from '@scullyio/ng-lib';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
    public content: any;
    public next: any;
    public previous: any;
    public themeIndex: number;

    public hidden = true;
    public isPhone: boolean;
    public redirecting: boolean;

    public projectKey: string;

    private themeColors: string[] = ['246, 165, 54', '0, 171, 158', '247, 41, 35'];
    private bgEndPerc: number;

    @ViewChild('backgroundEnd') backgroundEnd: ElementRef;
    @ViewChild('description') description: ElementRef;

    constructor(private _dataSvc: DataService, private _route: ActivatedRoute, private _router: Router) {
        if (isScullyGenerated()) {
            _router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(async e => {
                // Force content reset
                this.content = undefined;

                const content = await this._dataSvc.getSet('projects', this._route.snapshot.params.key);
                if (content) this.setContent(content);
                console.log(this._route.snapshot.params.key);
            });
        }

        // TODO: Re-introduce
        // Redirect if user tried old url format
        // if (params['category'] !== undefined) {
        //     this.redirecting = true;

        //     this.projectKey = params['key'];

        //     setTimeout(() => {
        //         window.location.href = 'projects/' + params['key'];
        //     }, 4200);
        //     return;
        // }

        // });
    }

    async ngOnInit() {
        // if (isScullyRunning()) {
        const content = await this._dataSvc.getSet('projects', this._route.snapshot.params.key);
        this.setContent(content);
        // }
        //  else {
        //     const content = await this._dataSvc.getSet('projects', 'atstake');

        //     this.setContent(content);
        //     this.hidden = false;
        // }
    }

    ngOnDestroy(): void {
        // Undo bg gradient
        const color = this.themeColors[this.themeIndex];
        const alpha = {
            a: 1,
        };
        // TweenLite.to(alpha, 1, {
        //     a: '-=1',
        //     onUpdate: () => {
        //         document.body.style.backgroundImage =
        //             'linear-gradient(to bottom, rgba(' +
        //             color +
        //             ',' +
        //             alpha.a +
        //             ' ) 0%, rgba(' +
        //             color +
        //             ',' +
        //             alpha.a +
        //             ') ' +
        //             this.bgEndPerc +
        //             '%, white ' +
        //             this.bgEndPerc +
        //             '%, white 100%)';
        //     },
        // });
    }

    setContent(data: any) {
        this.content = data.project;
        this.next = data.next;
        this.previous = data.prev;
        this.themeIndex = data.project['sortOrder'] % 3;

        this.setBgHeight();
    }

    setBgHeight(): void {
        // Slight timeout of 0 hack to allow page content to load in
        setTimeout(() => {
            if (this.backgroundEnd === undefined || this.description === undefined) return;

            const endY = this.backgroundEnd.nativeElement.offsetTop + this.backgroundEnd.nativeElement.offsetHeight;
            const windowHeight = document.body.clientHeight;
            this.bgEndPerc = (endY / windowHeight) * 100;
            const color = this.themeColors[this.themeIndex];

            // Skip bg fade if coming from other project, only adjust height
            if (this._dataSvc.previousUrl && this._dataSvc.previousUrl.split('/projects')[1]) {
                document.body.style.backgroundImage =
                    'linear-gradient(to bottom, rgba(' +
                    color +
                    ', 1) 0%, rgba(' +
                    color +
                    ', 1) ' +
                    this.bgEndPerc +
                    '%, white ' +
                    this.bgEndPerc +
                    '%, white 100%)';
                return;
            }

            const alpha = {
                a: 0,
            };

            // TweenLite.to(alpha, 1, {
            //     a: '+=1',
            //     onUpdate: () => {
            //         // Set bg to generated gradient
            //         document.body.style.backgroundImage =
            //             'linear-gradient(to bottom, rgba(' +
            //             color +
            //             ',' +
            //             alpha.a +
            //             ' ) 0%, rgba(' +
            //             color +
            //             ',' +
            //             alpha.a +
            //             ') ' +
            //             this.bgEndPerc +
            //             '%, white ' +
            //             this.bgEndPerc +
            //             '%, white 100%)';
            //     },
            // });
        }, 50);
    }
}