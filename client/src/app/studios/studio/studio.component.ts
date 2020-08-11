import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/utils/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-studio',
    templateUrl: './studio.component.html',
    styleUrls: ['./studio.component.scss'],
})
export class StudioComponent {
    public content: any;
    public next: any;
    public previous: any;

    private subscriber: Subscription;

    constructor(
        private dataSvc: DataService,
        private route: ActivatedRoute,
        private _router: Router,
    ) {
        this.subscriber = _router.events.subscribe(async e => {
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
                  sponsor
                  students
                  relatedLinks {
                      url
                      name
                      file {
                          url
                      }
                  }
                  collaborators
                  contact
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
                 
                }
            }
        `;

            const content = await this.dataSvc.getSetWithKey(
                'studios',
                key,
                query,
            );
            if (content) this.setContent(content['getStudio']);
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
        // this.next = data.next;
        // this.previous = data.prev;

        // Show dynamic BG image, if any
        if (this.content.bgImage) {
            let bodyBg = document.getElementById('project-bg');
            bodyBg.style.backgroundImage = `url(https://res.cloudinary.com/engagement-lab-home/image/upload/c_fill,f_auto,g_north,h_1110,w_2048/${this.content.bgImage.public_id})`;
            bodyBg.classList.add('open');
        }
    }
}
