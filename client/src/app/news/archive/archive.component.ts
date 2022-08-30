import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { DataService } from '../../utils/data.service';

@Component({
    selector: 'app-archive',
    templateUrl: './archive.component.html',
    styleUrls: ['./archive.component.scss'],
})
export class NewsArchiveComponent {
    public content: any;

    public next: any;
    public previous: any;
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
}
