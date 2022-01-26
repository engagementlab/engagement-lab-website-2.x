import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/utils/data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-initiative',
    templateUrl: './initiative.component.html',
    styleUrls: ['./initiative.component.scss'],
})
export class StudioInitiativeComponent {
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
                getStudioInitiative(key: "${key}") {
                  key
                  name
                  problemSpace
                  problemSpaceLabel
                  url
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
                'studio-initiative',
                key,
                query,
            );
            if (content && content['getStudioInitiative'])
                this.setContent(content['getStudioInitiative']);
            else router.navigateByUrl('uh-oh');
        });
    }

    ngOnDestroy(): void {
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
    }

    // Toggle selected video to display embed
    embedVideo(index: number) {
        this.videoDisplayToggle[index] = true;
    }
}
