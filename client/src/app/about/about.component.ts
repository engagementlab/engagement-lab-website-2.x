import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import isMobile from 'ismobilejs';

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

    constructor(private _dataSvc: DataService) {
        this.isPhone = isMobile().phone;
        this.isTablet = isMobile().tablet;
    }

    async ngOnInit(): Promise<any> {
        const response = await this._dataSvc.getSet('about');

        this.about = response['about'];
        this.partners = response['partners'];
        this.people = response['people'];
    }
}
