import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/utils/data.service';
interface Video {
    show: boolean;
    url: SafeResourceUrl;
}
type VideoData = Record<string, Video>;
@Component({
    selector: 'app-studios',
    templateUrl: './studios.component.html',
    styleUrls: ['./studios.component.scss'],
})
export class UndergraduateStudiosComponent implements OnInit, AfterViewInit {
    public content: any = {
        studiosDescription: {
            html: '',
        },
    };
    public requiredStudios: any;
    public studios: any;
    public videoDisplay: VideoData = {};

    public currentPerson: any;
    private gettingPerson: boolean;

    constructor(
        private dataSvc: DataService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private _route: ActivatedRoute,
    ) {
        this._route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params.key);
        });
    }

    async ngOnInit(): Promise<any> {
        // Pre-load person
        const key = this._route.snapshot.paramMap.get('key');
        if (key) this.getPerson(key);

        const query = `
        {
          allUndergraduateStudios {
            name
            requiredCourse
            description {
              html
            }
            faculty {
                key
                name {
                    first
                    last
                }
                image {
                    public_id
                }
            }
            semester
            url
            year
            {
                label
            }
            video
            videoThumbnail { 
                public_id
            }
          }

          allUndergraduatePages {
            studiosDescription { 
                html
            }
            currentStudiosYear
          }
        }
    `;

        const response = await this.dataSvc.getSetWithKey(
            'undergraduate',
            'studios',
            query,
        );
        this.content = response['allUndergraduatePages'];

        this.requiredStudios = response['allUndergraduateStudios'].filter(
            studio => {
                return studio.requiredCourse === true;
            },
        );
        this.studios = response['allUndergraduateStudios'].filter(studio => {
            return !studio.requiredCourse;
        });
        // Populate record for toggling video embeds and sanitize video IDs into iframe URLs
        response['allUndergraduateStudios'].forEach(studio => {
            if (studio.video) {
                this.videoDisplay[studio.video] = {
                    show: false,
                    url: this.sanitizer.bypassSecurityTrustResourceUrl(
                        `https://player.vimeo.com/video/${studio.video}?autoplay=1&color=00ab9e&byline=0&portrait=0`,
                    ),
                };
            }
        });
    }

    ngAfterViewInit() {}

    getYearStudios(label: string) {
        return this.studios.filter(studio => studio.year.label === label);
    }

    // Toggle selected video to display embed
    embedVideo(key: string) {
        this.videoDisplay[key].show = true;
    }

    async getPerson(key: string): Promise<void> {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;

        const query = `   
        {
            getPerson(key: "${key}") {
              name {
                first
                last
              }
              key
              title
              image {
                  public_id
              }
              bio { 
                  html
              }
              category
              relatedLinks
              contact
            }
        }`;

        const response = await this.dataSvc.getSetWithKey(
            'undergraduate-faculty',
            key,
            query,
        );
        this.currentPerson = response['getPerson'];
    }

    closePerson(): void {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this.router.navigateByUrl('curriculum/studios');
    }
}
