import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'search-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
    @Input() highlightedName: string;
    @Input() sourceName: string;
    @Input() content: string;
    @Input() type: string;
    @Input() key: string;

    public nameMarkup: SafeHtml;

    constructor(private _sanitizer: DomSanitizer) {}

    ngOnInit() {
        // If highlight empty, result found via record content and not name, so show source name
        if (this.highlightedName.length < 1)
            this.nameMarkup = this._sanitizer.bypassSecurityTrustHtml(
                this.sourceName,
            );
        else
            this.nameMarkup = this._sanitizer.bypassSecurityTrustHtml(
                this.highlightedName,
            );
    }
}
