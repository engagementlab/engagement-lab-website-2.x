import {
    Component,
    ViewChild,
    ElementRef,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute
} from '@angular/router';

import {
    DataService
} from '../utils/data.service';
import * as ismobile from 'ismobilejs';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    public content: any;
    public next: any;
    public previous: any;
    public themeIndex: number;

    public hidden: boolean = true;
    public isPhone: boolean;
    public redirecting: boolean;
    
    public projectKey: string;
    
    private themeColors: string[] = ['246, 165, 54', '0, 171, 158', '247, 41, 35'];
    private bgEndPerc: number;
    
    @ViewChild('backgroundEnd') backgroundEnd: ElementRef;
    @ViewChild('description') description: ElementRef;
    
    constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {
        
        this.isPhone = ismobile.phone;

        this._route.params.subscribe(params => {

            // Force content reset
            this.content = undefined;

            // Redirect if user tried old url format
            if(params['category'] !== undefined) {
                this.redirecting = true;
                this.projectKey = params['key'];

                setTimeout(() => {
                    window.location.href = 'projects/' + params['key'];
                }, 4200);
                return;
            }

            this._dataSvc.getDataForUrl('projects/get/' + params['key']).subscribe(response => {
                this.setContent(response);
                this.hidden = false;
            });

        });

    }

    ngOnInit() {

    }

    ngAfterViewChecked() {

        this.setBgHeight();

    }

    ngOnDestroy() {

        // Undo bg gradient
        let color = this.themeColors[this.themeIndex];
        let alpha = {
            a: 1
        };

    }

    setContent(data: any) {

        this.content = data.project;
        this.next = data.next;
        this.previous = data.prev;
        this.themeIndex = data.project['sortOrder'] % 3;

        // Slight timeout of 0 hack to allow page content to load in
        setTimeout(() => {

            let color = this.themeColors[this.themeIndex];

            // Skip bg fade if coming from other project, only adjust height
            if(this._dataSvc.previousUrl.split('/projects')[1]) {
                document.body.style.backgroundImage = 'linear-gradient(to bottom, rgba(' + color + ', 1) 0%, rgba(' + color + ', 1) ' + this.bgEndPerc + '%, white ' + this.bgEndPerc + '%, white 100%)';
                return;
            }
        }, 0);

    }

    setBgHeight() {

        if (this.backgroundEnd === undefined || this.description === undefined) return;

        let endY = this.backgroundEnd.nativeElement.offsetTop + this.backgroundEnd.nativeElement.offsetHeight;
        let windowHeight = document.body.clientHeight;
        this.bgEndPerc = (endY / windowHeight) * 100;

    }

}
