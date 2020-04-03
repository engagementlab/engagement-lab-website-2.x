import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    public isPhone: boolean;

    public isTablet: boolean;

    public about: any;

    public partners: any[];

    public people: any[];

    constructor(private _dataSvc: DataService) {}

    async ngOnInit() {
        const response = await this._dataSvc.getSet('about');

        this.about = response;
        // this.partners = response['partners'];
        // this.people = response['people'];
    }
}
