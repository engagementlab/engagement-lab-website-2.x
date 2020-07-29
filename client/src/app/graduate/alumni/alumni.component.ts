import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './alumni.component.html',
    styleUrls: ['./alumni.component.scss'],
})
export class GraduateAlumniComponent implements OnInit {
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
                    title
                    image {
                        public_id
                    }
                    bio {
                        html
                    }
                    cohortYear {
                        name  
                    }
                    twitterURL
                    fbURL
                    igURL
                    linkedInURL
                    githubURL
                    websiteURL
                    email
                    phone
                }
            }
        `;
        const result = await this.dataSvc.getSetWithKey(
            'graduate',
            'alumni',
            query,
        );
        this.alumni = result['allMastersPeople'];
    }

    async getPerson(key: string): Promise<void> {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;

        const response = await this.dataSvc.getSet('team', key);
        this.currentPerson = response;
    }

    closePerson(): void {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this._router.navigateByUrl('graduate/alumni');
    }
}
