import {
    Component,
    OnInit,
    ViewChildren,
    QueryList,
    ViewChild,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';
import anime from 'animejs/lib/anime.es.js';
import * as paper from 'paper';

import { tsParticles } from 'tsparticles';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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

    paperScope: paper.PaperScope;

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
            const taglineCover = document.getElementById(
                'particles',
            ) as HTMLElement;
            taglineCover.style.width = `${
                document.getElementById('intro').clientWidth
            }px`;
            taglineCover.style.height = `${
                document.getElementById('intro').clientHeight
            }px`;
            this.drawBg();
            // const taglineCover = document.querySelector(
            //     '.cover',
            // ) as HTMLElement;
            // taglineCover.style.width = `${this.taglineEl.nativeElement.clientWidth}px`;
            // taglineCover.style.height = `${this.taglineEl.nativeElement.clientHeight}px`;

            setTimeout(() => {
                anime({
                    easing: 'easeOutCirc',
                    targets: document.querySelectorAll('h1 span'),
                    opacity: [0, 1],
                    translateY: ['50%', 0],
                    delay: anime.stagger(500),
                });
                // Tagline show
                // anime({
                //     easing: 'easeInOutCirc',
                //     targets: document.querySelectorAll('.cover div.odd'),
                //     translateX: '100%',
                //     translateY: (el, i) => {
                //         return 50 + -50 * i;
                //     },
                //     duration: function() {
                //         return anime.random(2000, 3500);
                //     },
                // });
                // anime({
                //     easing: 'easeInOutCirc',
                //     targets: document.querySelectorAll('.cover div:not(.odd)'),
                //     translateX: '-100%',
                //     translateY: (el, i) => {
                //         return 50 + -50 * i;
                //     },
                //     duration: function() {
                //         return anime.random(2000, 3500);
                //     },
                // });
            }, 250);
        }, 700);
    }

    ngOnDestroy() {
        tsParticles.domItem(0).destroy();
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

    drawBg() {
        tsParticles.load('particles', {
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'repulse' },
                    resize: true,
                },
                modes: {
                    repulse: { distance: 50, duration: 0.4 },
                    remove: { particles_nb: 2 },
                },
            },
            particles: {
                number: {
                    value: 200,
                    density: { enable: true, value_area: 800 },
                },
                color: { value: '#5c5c5c' },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' },
                    polygon: { nb_sides: 5 },
                    image: { src: 'img/github.svg', width: 100, height: 100 },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: 0,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: true,
                    distance: 35,
                    color: '#313131',
                    opacity: 0.6210305795457366,
                    width: 2.1529060090918866,
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 },
                },
            },
        });
    }

    /* initializePath() {
        var width, height, center;
        var points = 10;

        const paperScope = new paper.PaperScope();
        paperScope.setup(<HTMLCanvasElement>document.getElementById('canvas'));
        var path = new paper.Path();

        const mouseTool = new paper.Tool();

        let mousePos: paper.Point = new paper.Point(0, 0),
            pathHeight = mousePos.y;
        mouseTool.onMouseMove = (evt: paper.ToolEvent) => {
            mousePos = evt.point;
        };
        path.strokeColor = new paper.Color('rgb(247, 41, 35)');
        center = paperScope.view.center;
        width = paperScope.view.size.width;
        height = paperScope.view.size.height / 2;
        path.segments = [];
        path.strokeWidth = 2;
        path.add(paperScope.view.bounds.leftCenter);
        for (var i = 1; i < points; i++) {
            var point = new paper.Point((width / points) * i, center.y);
            path.add(point);
        }
        path.add(paperScope.view.bounds.rightCenter);
        path.fullySelected = false;

        paperScope.view.onFrame = event => {
            pathHeight += (center.y - mousePos.y - pathHeight) / 50;
            for (var i = 1; i < points; i++) {
                var sinSeed = event.count + (i + (i % 10)) * 100;
                var sinHeight = Math.sin(sinSeed / 1200) * pathHeight;
                // Speed/freq of waves
                var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
                path.segments[i].point.y = yPos;
            }
            path.smooth({
                type: 'continuous',
            });

            // path.strokeColor.green += .01;
            // path.strokeColor.blue += .001;
            // path.strokeColor.red += 1;
        };
    } */
}
