import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';

@Component({
    templateUrl: './graduate.component.html',
    styleUrls: ['./graduate.component.scss'],
})
export class GraduateCurriculumComponent implements OnInit {
    public content: any;
    public curricula: any;
    public people: any;

    public currentPerson: any;
    private gettingPerson: boolean;

    constructor(
        private dataSvc: DataService,
        private router: Router,
        private _route: ActivatedRoute,
    ) {
        this._route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params.key);
        });
    }

    async ngOnInit(): Promise<any> {
        // Pre-load person
        const key = this._route.snapshot.paramMap.get('key');
        if (key) this.getPerson(key);

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

        this.content = mastersResponse['allMastersPages'];
        this.curricula = _.groupBy(
            mastersResponse['allCurriculumPages'],
            'type',
        );

        const cohortQuery = `   
          {
              allPeople(cohortYear: "${this.content.cohortYear}") {
                  name {
                      first
                      last
                  }
                  cohortYear {
                      name 
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
    async getPerson(key: string): Promise<void> {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;

        const query = `   
        {
            getPerson(key: "${key}") {
                name {
                    first
                    last
                }
                key
                title
                image {
                    public_id
                }
                bio { 
                    html
                }
                category
                relatedLinks
                contact
                projects {
                    image {
                        public_id
                    }
                    name
                    key
                    __typename
                }
            }
        }`;

        const response = await this.dataSvc.getSetWithKey(
            'graduate-faculty',
            key,
            query,
        );
        this.currentPerson = response['getPerson'];
    }

    closePerson(): void {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this.router.navigateByUrl('graduate');
    }
}
