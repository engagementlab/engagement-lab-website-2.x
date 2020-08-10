import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-graduate',
    templateUrl: './graduate.component.html',
    styleUrls: ['./graduate.component.scss'],
})
export class StudiosGraduateComponent implements OnInit {
    public content: any;
    public partners: any[];

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
          {
            studiosIntro {
                gradSummary
                gradSummaryImage {
                    public_id
                }
            }
          }
      `;
        const response = await this.dataSvc.getSetWithKey(
            'studios',
            'graduate',
            query,
        );
        this.content = response['studiosIntro'];
    }
}
