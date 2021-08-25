import { Component, SecurityContext } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/utils/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-studio',
    templateUrl: './studio.component.html',
    styleUrls: ['./studio.component.scss'],
})
export class StudioComponent {
    public content: any;
    public next: any;
    public previous: any;

    public videoDisplayToggle: [boolean] = [false];
    public videoUrls: [string];

    private subscriber: Subscription;

    constructor(
        private dataSvc: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer,
    ) {
        this.subscriber = router.events.subscribe(async e => {
            if (!(e instanceof NavigationEnd)) return;

            const { key } = this.route.snapshot.params;

            // Force content reset
            this.content = undefined;

            const query = `
            {
                getStudio(key: "${key}") {
                  key
                  name
                  status
                  semester
                  faculty {
                      name {
                          first
                          last
                      }
                      key
                  }
                  department
                  departmentLabel
                  sponsor
                  sponsorLabel
                  students
                  relatedLinks {
                      url
                      name
                      file {
                          url
                      }
                  }
                  collaborators {
                      html
                  }
                  contact
                  body {
                      html
                  }
                  studentProjects {
                      html
                  }
                  introduction {
                      html
                  }
                  impact {
                      html
                  }
                  roles {
                      html
                  }
                  bgImage {
                      public_id
                  }
                  galleryImages {
                      public_id
                  }
                  galleryImageCaptions
                  primaryImage {
                    public_id
                  }
                  primaryImageDescription
                  primaryImageCredit
                  galleryVideos
                  galleryVideoTitles
                  galleryVideoCaptions
                  galleryVideoThumbails {
                      public_id
                  }
                }
            }
        `;

            const content = await this.dataSvc.getSetWithKey(
                'studios',
                key,
                query,
            );
            if (content && content['getStudio'])
                this.setContent(content['getStudio']);
            else router.navigateByUrl('uh-oh');
        });
    }

    ngOnDestroy(): void {
        // Reset BG
        document.getElementById('project-bg').classList.remove('open');

        // Cancel router subscribe
        this.subscriber.unsubscribe();
    }

    setContent(data: any): void {
        this.content = data;

        // Populate array for toggling video embeds and sanitize video IDs into iframe URLs
        this.videoUrls = this.content['galleryVideos'].map(vid => {
            this.videoDisplayToggle.push(false);
            return this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://player.vimeo.com/video/${vid}?autoplay=1&color=00ab9e&byline=0&portrait=0`,
            );
        });

        // Show dynamic BG image, if any
        if (this.content.bgImage) {
            let bodyBg = document.getElementById('project-bg');
            bodyBg.style.backgroundImage = `url(https://res.cloudinary.com/engagement-lab-home/image/upload/c_fill,f_auto,g_north,h_1110,w_2048/${this.content.bgImage.public_id})`;
            bodyBg.classList.add('open');
        }
    }

    // Toggle selected video to display embed
    embedVideo(index: number) {
        this.videoDisplayToggle[index] = true;
    }
}
