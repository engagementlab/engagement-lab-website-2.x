import {
    Component,
    OnInit,
    ViewChildren,
    QueryList,
    ViewChild,
    ElementRef,
} from '@angular/core';

import * as _ from 'underscore';
import * as paper from 'paper';
import { DataService } from '../utils/data.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public errors: any;

    public content: any;

    public latestEvent: any;

    public tagline: string;

    public isPhone: boolean;

    @ViewChildren('initiativeList') initiativeList: QueryList<any>;

    @ViewChild('canvasElement') canvasElement: ElementRef;

    @ViewChild('newsletterBtn') newsletterBtn: ElementRef;

    @ViewChild('newsletter') newsletter: ElementRef;

    @ViewChild('pattern1') pattern1: ElementRef;

    @ViewChild('pattern2') pattern2: ElementRef;

    @ViewChild('pattern3') pattern3: ElementRef;

    public emailForm: FormGroup;

    // eslint-disable-next-line no-useless-constructor
    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allAboutPages {
                    tagline {
                        html
                    }
                }
                recentEvents {
                    name
                    key
                    date
                    images {
                        public_id
                    }
                }
                allNewsItems(featured: true) {
                    title
                    url
                    image {
                        public_id
                    }
                }
            }
        `;

        this.content = await this.dataSvc.getSet('homepage', query);
    }

    openSignup() {
        this.newsletterBtn.nativeElement.classList.add('closed');
        setTimeout(() => {
            this.newsletterBtn.nativeElement.style.display = 'none';
            this.newsletter.nativeElement.style.display = 'inline-block';

            this.newsletter.nativeElement.classList.add('open');
        }, 200);
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.emailForm.controls;
    }

    submitNewsletter() {
        // stop here if form is invalid
        if (this.emailForm.invalid) {
            return;
        }
    }

    taglineAnim(position: number) {
        if (!document.querySelector('#home-bg').classList.contains('open')) {
            document.querySelector('#home-bg').classList.add('open');
        }
        (<HTMLElement>(
            document.querySelector('#home-bg #slides')
        )).style.transform = `translate(-${position * 1905}px)`;
    }

    taglineHide() {
        document.querySelector('#home-bg').classList.remove('open');
    }
}
