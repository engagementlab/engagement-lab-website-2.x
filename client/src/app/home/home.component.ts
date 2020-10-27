import {
    Component,
    OnInit,
    ViewChildren,
    QueryList,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';
import anime from 'animejs/lib/anime.es.js';

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
    public emailFieldFocused: boolean;

    @ViewChildren('initiativeList') initiativeList: QueryList<any>;

    @ViewChild('canvasElement') canvasElement: ElementRef;

    @ViewChild('newsletterBtn') newsletterBtn: ElementRef;
    @ViewChild('newsletterSubscribed') newsletterSubscribed: ElementRef;
    @ViewChild('newsletterError') newsletterError: ElementRef;

    @ViewChild('newsletter') newsletter: ElementRef;

    public emailForm: FormGroup;

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private dataSvc: DataService,
        private formBuilder: FormBuilder,
    ) {
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

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
                    shortDescription
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
        setTimeout(() => {
            console.log(document.querySelectorAll('h1 span'));
            anime({
                easing: 'easeOutCirc',
                targets: document.querySelectorAll('h1 span'),
                opacity: [0, 1],
                translateY: ['50%', 0],
                delay: anime.stagger(500),
            });
        }, 700);
    }

    openSignup() {
        this.newsletterBtn.nativeElement.classList.add('closed');
        setTimeout(() => {
            this.newsletterBtn.nativeElement.style.display = 'none';
            this.newsletter.nativeElement.style.display = 'flex';

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
        this.dataSvc
            .sendDataToUrl(`post/newsletter/${this.f['email'].value}`, null)
            .subscribe(
                (data: any) => {
                    this.newsletterSubscribed.nativeElement.classList.add(
                        'open',
                    );
                    this.newsletter.nativeElement.classList.add('done');
                },
                (error: any) => {
                    console.log(error);
                    if (error.error === 'already_subscribed')
                        this.newsletterError.nativeElement.classList.add(
                            'open',
                        );
                },
            );
    }

    emailFocus() {
        this.emailFieldFocused = true;
    }
}
