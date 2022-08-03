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
import isMobile from 'ismobilejs';
import anime from 'animejs/lib/anime.es.js';

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

    public emailFieldFocused: boolean;

    @ViewChildren('initiativeList') initiativeList: QueryList<any>;

    @ViewChild('particles') particles: ElementRef;
    @ViewChild('tagline') taglineEl: ElementRef;
    @ViewChild('taglineInner') taglineInnerEl: ElementRef;

    @ViewChild('newsletterBtn') newsletterBtn: ElementRef;
    @ViewChild('newsletterSubscribed') newsletterSubscribed: ElementRef;
    @ViewChild('newsletterError') newsletterError: ElementRef;
    @ViewChild('newsletter') newsletter: ElementRef;

    public emailForm: FormGroup;

    particlesLineDistance: number = 55;
    isPhone: boolean;

    // eslint-disable-next-line no-useless-constructor
    constructor(
        private dataSvc: DataService,
        private formBuilder: FormBuilder,
    ) {
        // Determine if agent is phone; used to lessen particle effect
        this.isPhone = isMobile(window.navigator.userAgent).phone;

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
                allNewsItems {
                    title
                    url
                    image {
                        public_id
                    }
                }
            }
        `;

        this.content = await this.dataSvc.getSet('homepage', query);

        // Load particles effect after content render
        setTimeout(() => {
            const particlesEl = this.particles.nativeElement;
            particlesEl.style.width = `${
                document.getElementById('intro').clientWidth
            }px`;
            particlesEl.style.height = `${
                document.getElementById('intro').clientHeight
            }px`;

            this.drawParticles();

            // Animate tagline and intro
            anime({
                easing: 'easeOutCirc',
                targets: document.querySelectorAll('h1 span'),
                opacity: [0, 1],
                translateY: ['50%', 0],
                delay: anime.stagger(500),
                begin: () => {
                    document.querySelector('h1').classList.add('show');
                    document.querySelector('h1').style.visibility = 'visible';
                    document.getElementById('inner').style.visibility =
                        'visible';
                    document
                        .getElementById('newsletter-wrap')
                        .classList.add('show');
                },
            });

            anime({
                easing: 'easeInOutQuint',
                targets: this.taglineInnerEl.nativeElement,
                translateY: ['-15%', 0],
                opacity: 1,
                duration: 2000,
                delay: 1000,
            });

            anime({
                targets: this.newsletterBtn.nativeElement,
                opacity: 1,
                duration: 1000,
                delay: 2500,
            });
        }, 1);
    }

    ngOnDestroy() {
        // Get rid of particles
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

    drawParticles() {
        tsParticles.load('particles', {
            fullScreen: false,
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
                    value: this.isPhone ? 100 : 200,
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
                    distance: this.particlesLineDistance,
                    color: '#313131',
                    opacity: 0.4,
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
}
