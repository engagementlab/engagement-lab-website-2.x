import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-masters',
    templateUrl: './masters.component.html',
    styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {
    public content: any;

    public people: any;

    constructor(private _dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        // Pre-load person?
        // const key = this._route.snapshot.paramMap.get('key');
        // if (key) this.getPerson(key);

        const mastersQuery = `
            {
                allMastersPages {
                    programDescription {
                        html
                    }
                    applicationLink
                    buttonTxt 
                    cohortYear
                }
            }
        `;

        const mastersResponse = await this._dataSvc.getSet(
            'masters',
            mastersQuery
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
        const cohortResponse = await this._dataSvc.getSetWithKey(
            'masters',
            'cohort',
            cohortQuery
        );
        this.people = cohortResponse['allPeople'];

        // We have to add dummy/empty people if non-x4 count to allow for correct flex layout
        const mod = this.people.length % 4;
        for (let i = 0; i < mod; i++) this.people.push({ name: 'dummy' });
    }
}
