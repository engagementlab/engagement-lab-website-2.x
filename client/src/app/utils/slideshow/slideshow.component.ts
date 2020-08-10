import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';

import isMobile from 'ismobilejs';
import Masonry from 'masonry-layout';

interface Image {
    public_id: string;
}

@Component({
    selector: 'slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
    @Input() images: Image[];
    @Input() captions: string[];
    @Input() title: string;

    ngOnInit(): void {}

    ngAfterViewInit() {
        const elem = document.getElementById('slideshow');
        new Masonry(elem, {
            itemSelector: '.img',
            gutter: '.gutter-sizer',
            percentPosition: true,
        });
    }
}
