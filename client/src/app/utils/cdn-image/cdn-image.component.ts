import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'cdn-image',
    templateUrl: './cdn-image.component.html',
    styleUrls: ['./cdn-image.component.scss'],
})
export class CdnImageComponent implements OnInit {
    @Input() cloudinaryId: string;
    @Input() cloudinaryPrefix: string;
    @Input() alt: string;
    @Input() describedby: string = '';
    @Input() effect: string = 'brightness:0';
    @Input() crop: string = 'scale';
    @Input() gravity: string = 'auto:none';
    @Input() loading: string = 'lazy';
    @Input() height: number;
    @Input() width: string;

    @Input() responsive: boolean = true;
    @Input() autoFormat: boolean = false;
    @Input() svg: boolean = false;

    public widthCss: SafeStyle;
    public widthAuto: SafeStyle;
    public imgId: string;
    public show: boolean;

    constructor(
        private _sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platform: Object,
    ) {}

    ngOnInit() {
        // Disable lazy loading on iOS 13 (this version never loads lazy images, inexplicably)
        if (this.iosVersion() === 13) this.loading = '';

        this.show = isPlatformBrowser(this.platform);

        this.imgId =
            (this.cloudinaryPrefix ? this.cloudinaryPrefix : 'homepage-2.0/') +
            this.cloudinaryId;

        if (this.width)
            this.widthCss = this._sanitizer.bypassSecurityTrustStyle(
                'width:' + this.width + 'px; max-width:' + this.width + 'px',
            );
    }

    iosVersion() {
        var agent = window.navigator.userAgent,
            start = agent.indexOf('OS ');
        if (
            (agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) &&
            start > -1
        ) {
            return window.Number(agent.substr(start + 3, 3).replace('_', '.'));
        }
        return 0;
    }
}
