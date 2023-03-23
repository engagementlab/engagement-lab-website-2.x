import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChildren,
    QueryList,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
    public content: any;
    public requiredStudios: any;
    public studios: any;
    public videoDisplay: VideoData = {};

    constructor(
        private dataSvc: DataService,
        private sanitizer: DomSanitizer,
    ) {}

    async ngOnInit(): Promise<any> {
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
}
