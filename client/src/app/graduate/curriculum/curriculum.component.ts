import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    templateUrl: './curriculum.component.html',
    styleUrls: ['./curriculum.component.scss'],
})
export class GraduateCurriculumComponent implements OnInit {
    public content: any;
    public people: any;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const mastersQuery = `
          {
              allMastersPages {
                  programDescription
                  partnerships
                  learningObjectives
                  cohortYear
              }
          }
      `;

        const mastersResponse = await this.dataSvc.getSet(
            'masters',
            mastersQuery,
        );

        this.content = mastersResponse['allMastersPages'];

        const cohortQuery = `   
          {
              allPeople(cohortYear: "${this.content.cohortYear}") {
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
        const cohortResponse = await this.dataSvc.getSetWithKey(
            'masters',
            'cohort',
            cohortQuery,
        );
        this.people = cohortResponse['allPeople'];
    }
}
