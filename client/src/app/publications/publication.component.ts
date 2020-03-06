import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'publication',
    templateUrl: './publication.component.html',
    styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
    @Input() pub: any;
    @Input() type: string;

    public iconWidth: number;
    public year: number;
    public link: string;
    public hasDownloads: boolean;
    public hasResource: boolean;
    public isExternal: boolean;

    constructor() {}

    ngOnInit() {
        const p = this.pub;

        this.iconWidth = this.type === 'book' ? 37 : 50;
        this.year = new Date(p.date).getFullYear();

        this.hasDownloads = p.downloadUrls && p.downloadUrls.length > 0;
        this.hasResource = p.articleResource && p.articleResource.file !== undefined;
        this.isExternal = p.purchaseUrls && p.purchaseUrls.length > 0;

        // Set link for pub
        if (this.hasDownloads) this.link = p.downloadUrls;
        else if (this.hasResource) this.link = p.articleResource.file.url;
        else this.link = p.purchaseUrls;
    }
}
