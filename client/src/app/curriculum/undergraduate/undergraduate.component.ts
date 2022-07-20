import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-undergraduate',
    templateUrl: './undergraduate.component.html',
    styleUrls: ['./undergraduate.component.scss'],
})
export class UndergraduateComponent implements OnInit {
    public content: any;
    public curricula: any;
    public people: any;

    public currentPerson: any;
    private gettingPerson: boolean;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const mastersQuery = `
        {
            allMastersPages {
                programDescription {
                    html
                }
                partnerships {
                    html
                }
                coursesInfo {
                    html
                }
                cohortYear
                phases
                faculty {
                    key
                    name {
                        first
                        last
                    }
                    image {
                        public_id
                    }
                }
                projects {
                    key
                    name
                    cohortYear {
                        label
                    }
                    faculty {
                        name {
                            first 
                            last
                        }
                    }
                    thumb {
                        public_id
                    }
                }
            }
            allCurriculumPages {
              name
              type
            }
        }
    `;

        const mastersResponse = await this.dataSvc.getSet(
            'graduate',
            mastersQuery,
        );

        // this.content = mastersResponse['allMastersPages'];
        // this.curricula = _.groupBy(
        //     mastersResponse['allCurriculumPages'],
        //     'type',
        // );
    }
}
