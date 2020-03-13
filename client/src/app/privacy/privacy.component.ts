import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
    public content: any;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        this.content = await this._dataSvc.getSet('privacy');
    }
}
