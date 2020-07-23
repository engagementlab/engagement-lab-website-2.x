import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'publication',
    templateUrl: './publication.component.html',
    styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
    @Input() pub: any;

    public year: number;
    public publishDate: string;
    public link: string;
    public hasDownloads: boolean;
    public hasResource: boolean;
    public isExternal: boolean;

    ngOnInit(): void {
        const p = this.pub;
        if (!p) return;

        const date = new Date(p.date);
        this.year = date.getFullYear();
        this.publishDate = `${date.toLocaleString('default', {
            month: 'short',
        })} ${date.getDate()} ${date.getFullYear()}`;

        // Set link for pub
        if (p.downloadUrls) this.link = p.downloadUrls;
        else if (p.articleResource) this.link = p.articleResource.file.url;
        else this.link = p.purchaseUrls;
    }
}
