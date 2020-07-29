import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-studios',
    templateUrl: './studios.component.html',
    styleUrls: ['./studios.component.scss'],
})
export class GraduateStudiosComponent implements OnInit {
    public content: any;
    public cohorts: any;
    public projects: any;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const query = `
        {
            allMastersPages {
              studiosBlurb
            }
            allCohorts {
              key
              name
            }
            allMDProjectPages {
              key
              name
              thumb {
                public_id
              }
            }
        }
    `;

        const mastersResponse = await this.dataSvc.getSetWithKey(
            'graduate',
            'studios',
            query,
        );
        this.content = mastersResponse['allMastersPages'];
        this.cohorts = mastersResponse['allCohorts'];
        this.projects = mastersResponse['allMDProjectPages'];
    }
}
