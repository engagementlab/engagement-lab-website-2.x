import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { DataService } from '../utils/data.service';
import { keyframes } from '@angular/animations';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class NewsIndexComponent implements OnInit {
    public news: any;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit() {
        // const response = await this._dataSvc.getSet('events');
        const query = `
            {
                allBlogItems {
                    datePosted
                    title
                    key
                }
            }
        `;
        // const response = await this._dataSvc.getSet('news', query);
        // this._dataSvc.getNewsArchive().subscribe(
        //     (data: any) => {
        //         this.news = data;
        //     },
        //     (error: any) => {
        //         console.log(error);
        //     },
        // );
        const response = await this._dataSvc.getSet('news', query);
        this.news = response['allBlogItems'];

        console.log(this.news);
    }
}
