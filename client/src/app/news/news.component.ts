import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
    public content: any;

    public next: any;
    public previous: any;

    public videoDisplayToggle: boolean;
    public videoUrl: SafeResourceUrl;

    public thirdImgId: string;

    private subscriber: Subscription;

    @ViewChild('backgroundEnd') backgroundEnd: ElementRef;

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
                getBlogItem(key: "${key}") {
                    datePosted
                    title
                    body {
                        html
                    }
                }
            }`;

            const content = await this.dataSvc.getSetWithKey(
                'news',
                key,
                query,
            );
            // eslint-disable-next-line dot-notation
            if (content) this.setContent(content['getBlogItem']);
        });
    }

    ngOnDestroy(): void {
        // Cancel router subscribe
        this.subscriber.unsubscribe();
    }

    setContent(data: any): void {
        this.content = data;
        // this.next = data.next;
        // this.previous = data.prev[0];
    }

    // Toggle event video to display embed
    embedVideo() {
        this.videoDisplayToggle = true;
    }

    // @HostListener('window:keyup', ['$event'])
    // keyEvent(event: KeyboardEvent): void {
    //     if (event.keyCode === KEY_CODE.RIGHT_ARROW)
    //         this.router.navigateByUrl(`/events/${this.next.key}`);
    //     if (event.keyCode === KEY_CODE.LEFT_ARROW)
    //         this.router.navigateByUrl(`/events/${this.previous.key}`);
    // }
}
