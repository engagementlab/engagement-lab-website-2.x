import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'publication',
    templateUrl: './publication.component.html',
    styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
    @Input() pub: any;

    public year: number;
    public link: string;
    public hasDownloads: boolean;
    public hasResource: boolean;
    public isExternal: boolean;

    ngOnInit(): void {
        const p = this.pub;
        if (!p) return;

        this.year = new Date(p.date).getFullYear();

        // Set link for pub
        if (this.hasDownloads) this.link = p.downloadUrls;
        else if (this.hasResource) this.link = p.articleResource.file.url;
        else this.link = p.purchaseUrls;
    }
}
