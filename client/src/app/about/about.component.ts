import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    public isPhone: boolean;

    public isTablet: boolean;

    public about: any;

    public partners: any[];

    public people: any[];

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allAboutPages {
                    missionStatement 
                    summary1
                    summary2
                    images
                    {
                        public_id 
                    }
                    research
                    workshops
                    tools
                    teaching
                    design
                }
                allStaffPeople {
                    name {
                        first
                        last
                    }
                    key
                    image {
                        public_id
                    }
                }
            }
        `;
        const response = await this._dataSvc.getSet('about', query);
        this.about = response['allAboutPages'];
        // this.partners = response['partners'];
        this.people = response['allStaffPeople'];
        debugger;
    }
}
