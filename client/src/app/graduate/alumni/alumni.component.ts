import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './alumni.component.html',
    styleUrls: ['./alumni.component.scss'],
})
export class GraduateAlumniComponent implements OnInit {
    public students: any;
    public alumni: any;

    public currentPerson: any;

    private gettingPerson: boolean;

    constructor(
        private dataSvc: DataService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
        this._route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params.key);
        });
    }

    async ngOnInit(): Promise<void> {
        // Pre-load person
        const key = this._route.snapshot.paramMap.get('key');
        if (key) this.getPerson(key);

        const query = `
            {
                allMastersPeople {
                    name {
                        first
                        last
                    }
                    key
                    image {
                        public_id
                    }
                    cohortYear {
                        label
                    }
                }
                allAlumniPeople {
                    name {
                        first
                        last
                    }
                    key
                    image {
                        public_id
                    }
                    cohortYear {
                        label
                    }
                }
            }
        `;
        const result = await this.dataSvc.getSetWithKey(
            'graduate',
            'students',
            query,
        );
        this.students = result['allMastersPeople'];
        this.alumni = result['allAlumniPeople'];
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
                cohortYear {
                    label
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
                mdProjects {
                    thumb {
                        public_id
                    }
                    name
                    key
                    __typename
                }
            }
        }`;

        const response = await this.dataSvc.getSetWithKey(
            'graduate',
            key,
            query,
        );
        this.currentPerson = response['getPerson'];
    }

    closePerson(): void {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this._router.navigateByUrl('graduate/students');
    }
}
