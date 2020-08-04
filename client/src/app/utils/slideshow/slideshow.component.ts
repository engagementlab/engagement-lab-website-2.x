import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';

import isMobile from 'ismobilejs';

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
    @Input() title: string;
    @ViewChild('slideWrapper') slideWrapper: ElementRef;

    private isMobile: boolean;
    private wrapperWidth: number;
    private currentSlide: number = 0;

    constructor() {
        this.isMobile = isMobile(window.navigator).phone;
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.wrapperWidth = this.images.length * (isMobile ? 80 : 47);
        this.slideWrapper.nativeElement.style.width = `${this.wrapperWidth}%`;
    }

    public moveSlide(dir: number) {
        this.currentSlide += dir;
        this.slideWrapper.nativeElement.style.transform = `translate(-${this
            .currentSlide * (isMobile ? 16 : 33)}%)`;
    }
}
