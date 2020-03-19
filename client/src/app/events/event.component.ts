import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../utils/data.service';
import { Subscription } from 'rxjs';
import { KEY_CODE } from '../projects/project.component';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent {
    public content: any;
    public next: any;
    public previous: any;

    private bgEndPerc: number;
    private bgAlpha = 0;

    private bgInterval: any;
    private bgTimeout: any;

    private subscriber: Subscription;

    @ViewChild('backgroundEnd') backgroundEnd: ElementRef;

    constructor(private _dataSvc: DataService, private _route: ActivatedRoute, private _router: Router) {
        // this._route.params.subscribe(params => {
        //     this._dataSvc.getDataForUrl('events/get/' + params['key']).subscribe(response => {
        //         this.setContent(response);
        //         this.hidden = false;
        //     });
        // });
        this.subscriber = _router.events.subscribe(async e => {
            if (!(e instanceof NavigationEnd)) return;

            const key = this._route.snapshot.params.key;

            // Force content reset
            this.content = undefined;

            const content = await this._dataSvc.getSet('projects', key);
            if (content) this.setContent(content);
            this.bgAlpha = 0;
            const alphaInterval = setInterval(() => {
                this.bgAlpha += 0.015;
                if (this.bgAlpha >= 1) clearInterval(alphaInterval);
            }, 15);
        });
    }

    ngOnDestroy(): void {
        // Reset BG
        document.body.style.backgroundImage = '';

        // Cancel timers for bg
        clearInterval(this.bgInterval);
        clearTimeout(this.bgTimeout);

        // Cancel router subscribe
        this.subscriber.unsubscribe();
    }

    setContent(data: any): void {
        this.content = data.project;
        this.next = data.next;
        this.previous = data.prev;

        this.setBgHeight();

        // Fade in
        const alphaInterval = setInterval(() => {
            this.bgAlpha += 0.015;
            if (this.bgAlpha >= 1) clearInterval(alphaInterval);
        }, 15);
    }

    setBgHeight(): void {
        // Run every 1ms for 3s for the end of gradient always end at desired % after full page load
        // This is slightly hacky but the only way to really ensure proper render.
        this.bgInterval = setInterval(() => {
            if (this.backgroundEnd === undefined) return;

            const endY = this.backgroundEnd.nativeElement.offsetTop + this.backgroundEnd.nativeElement.offsetHeight;
            const windowHeight = document.body.clientHeight;
            this.bgEndPerc = (endY / windowHeight) * 100;
            const color = '247, 41, 35';

            document.body.style.backgroundImage = `linear-gradient(
                to bottom, 
                rgba(${color}, ${this.bgAlpha}) 0%, 
                rgba(${color}, ${this.bgAlpha}) ${this.bgEndPerc}%, 
                white ${this.bgEndPerc}%, 
                white 100%)`;
        }, 1);

        // Cancel soon
        this.bgTimeout = setTimeout(() => {
            clearInterval(this.bgInterval);
        }, 3000);
    }
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) this._router.navigateByUrl(`/projects/${this.next.key}`);
        if (event.keyCode === KEY_CODE.LEFT_ARROW) this._router.navigateByUrl(`/projects/${this.previous.key}`);
    }
}
