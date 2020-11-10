import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class GraduateInfoComponent implements OnInit {
    public content: any;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const infoQuery = `
        {
            allMastersPages {
              applicationBlurb { 
                html
              }
              applicationLink
              buttonTxt
            }
        }
    `;

        const mastersResponse = await this.dataSvc.getSetWithKey(
            'graduate',
            'info',
            infoQuery,
        );

        this.content = mastersResponse['allMastersPages'];
    }
}
