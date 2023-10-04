import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
    public content: any;

    constructor(private dataSvc: DataService, private route: ActivatedRoute) {}

    async ngOnInit() {
        const { key } = this.route.snapshot.params;
        const data = null;
        this.setContent(data);
    }

    setContent(data: any): void {
        this.content = data;
        // this.next = data.next;
        // this.previous = data.prev[0];
    }
}
