import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-undergraduate',
    templateUrl: './undergraduate.component.html',
    styleUrls: ['./undergraduate.component.scss'],
})
export class UndergraduateComponent implements OnInit {
    public content: any;
    public academicYears: any;
    public requiredStudios: any;
    public studios: any;

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

        const query = `
        {
            allYears {
                label
            }
          allUndergraduatePages {
            description {
                html
            }
            currentStudiosYear
          }
          allUndergraduateStudios {
            name
            requiredCourse
            description {
              html
            }
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
            semester
            url
            year
            {
                label
            }
          }
        }
      `;

        const response = await this.dataSvc.getSet('undergraduate', query);

        this.content = response['allUndergraduatePages'];
        this.academicYears = response['allYears'];
        this.requiredStudios = response['allUndergraduateStudios'].filter(
            studio => {
                return studio.requiredCourse === true;
            },
        );
        this.studios = response['allUndergraduateStudios'].filter(studio => {
            return !studio.requiredCourse;
        });
    }

    getYearStudios(label: string) {
        return this.studios.filter(studio => studio.year.label === label);
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
            }
        }`;

        const response = await this.dataSvc.getSetWithKey(
            'undergraduate-faculty',
            key,
            query,
        );
        this.currentPerson = response['getPerson'];
    }

    closePerson(): void {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this.router.navigateByUrl('curriculum/undergraduate');
    }
}
