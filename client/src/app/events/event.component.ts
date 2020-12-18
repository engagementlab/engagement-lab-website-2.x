import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { DataService } from '../utils/data.service';
import { KEY_CODE } from '../research/projects/project.component';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent {
    public content: any;

    public next: any;
    public previous: any;

    private subscriber: Subscription;

    @ViewChild('backgroundEnd') backgroundEnd: ElementRef;

    constructor(
        private _dataSvc: DataService,
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
                getEvent(key: "${key}") {
                    event {
                        name
                        key
                        date
                        shortDescription 
                        eventUrl
                        description
                        {
                            html
                        }
                        showButton
                        buttonTxt
                        images {
                            public_id
                        }
                    }
                    prev {
                        name
                        key
                    }
                    next {
                        name
                        key
                    }
                }
            }
        `;

            const content = await this._dataSvc.getSetWithKey(
                'events',
                key,
                query,
            );
            // eslint-disable-next-line dot-notation
            if (content) this.setContent(content['getEvent']);
        });
    }

    ngOnDestroy(): void {
        // Cancel router subscribe
        this.subscriber.unsubscribe();
    }

    setContent(data: any): void {
        this.content = data.event;
        this.next = data.next;
        this.previous = data.prev;
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW)
            this._router.navigateByUrl(`/events/${this.next.key}`);
        if (event.keyCode === KEY_CODE.LEFT_ARROW)
            this._router.navigateByUrl(`/events/${this.previous.key}`);
    }
}
