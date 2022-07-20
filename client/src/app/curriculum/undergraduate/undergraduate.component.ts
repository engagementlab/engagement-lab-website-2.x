import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-undergraduate',
    templateUrl: './undergraduate.component.html',
    styleUrls: ['./undergraduate.component.scss'],
})
export class UndergraduateComponent implements OnInit {
    public content: any;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const query = `
        {
          allUndergraduatePages {
                description {
                    html
                }
          }
        }
      `;

        const response = await this.dataSvc.getSet('undergraduate', query);

        this.content = response['allUndergraduatePages'];
        // this.curricula = _.groupBy(
        //     mastersResponse['allCurriculumPages'],
        //     'type',
        // );
    }
}
