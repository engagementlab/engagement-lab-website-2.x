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
import * as paper from 'paper';

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

    @ViewChild('tagline') taglineEl: ElementRef;
    @ViewChild('taglineInner') taglineInnerEl: ElementRef;
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

        this.initializePath();

        this.content = await this.dataSvc.getSet('homepage', query);
        setTimeout(() => {
            anime({
                easing: 'easeOutCirc',
                targets: document.querySelectorAll('h1 span'),
                opacity: [0, 1],
                translateY: ['50%', 0],
                delay: anime.stagger(500),
            });
            const taglineCover = document.querySelector(
                '.cover',
            ) as HTMLElement;
            // taglineCover.style.width = `${this.taglineEl.nativeElement.clientWidth}px`;
            // taglineCover.style.height = `${this.taglineEl.nativeElement.clientHeight}px`;

            setTimeout(() => {
                // Tagline show
                anime({
                    easing: 'easeInOutCirc',
                    targets: document.querySelectorAll('.cover div.odd'),
                    translateX: '100%',
                    translateY: (el, i) => {
                        return 50 + -50 * i;
                    },
                    duration: function() {
                        return anime.random(2000, 3500);
                    },
                });
                anime({
                    easing: 'easeInOutCirc',
                    targets: document.querySelectorAll('.cover div:not(.odd)'),
                    translateX: '-100%',
                    translateY: (el, i) => {
                        return 50 + -50 * i;
                    },
                    duration: function() {
                        return anime.random(2000, 3500);
                    },
                });
            }, 1500);
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

    initializePath() {
        var width, height, center;
        var points = 10;
        var smooth = true;

        const _paper = new paper.PaperScope();
        _paper.setup(<HTMLCanvasElement>document.getElementById('canvas'));
        var path = new paper.Path();

        const mouseTool = new paper.Tool();

        let mousePos: paper.Point = new paper.Point(0, 0),
            followMouse = false,
            pathHeight = mousePos.y;
        mouseTool.onMouseMove = (evt: paper.ToolEvent) => {
            mousePos = evt.point;
        };
        path.strokeColor = new paper.Color('rgb(247, 41, 35)');
        center = _paper.view.center;
        width = _paper.view.size.width;
        height = _paper.view.size.height / 2;
        path.segments = [];
        path.strokeWidth = 2;
        path.add(_paper.view.bounds.leftCenter);
        for (var i = 1; i < points; i++) {
            var point = new paper.Point((width / points) * i, center.y);
            path.add(point);
        }
        path.add(_paper.view.bounds.rightCenter);
        path.fullySelected = false;

        _paper.view.onFrame = event => {
            pathHeight += (center.y - mousePos.y - pathHeight) / 50;
            for (var i = 1; i < points; i++) {
                var sinSeed = event.count + (i + (i % 10)) * 100;
                var sinHeight = Math.sin(sinSeed / 1200) * pathHeight;
                // Speed/freq of waves
                var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
                path.segments[i].point.y = yPos;
            }
            if (smooth)
                path.smooth({
                    type: 'continuous',
                });

            // path.strokeColor.green += .01;
            // path.strokeColor.blue += .001;
            // path.strokeColor.red += 1;
        };
    }

    // Reposition the path whenever the window is resized:
    //   function onResize(event) {
    //     initializePath();
    //   }
}
