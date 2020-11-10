import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
    public content: any;
    public partners: any[];

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allAboutPages {
                    summary1
                    summary2
                    image
                    {
                        public_id 
                    }
                }
                allPartners {
                    name 
                    image {
                        public_id
                    }
                    url
                }
            }
        `;
        const response = await this._dataSvc.getSet('about', query);
        this.content = response['allAboutPages'];
        this.partners = response['allPartners'];
    }
}
