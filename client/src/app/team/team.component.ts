import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'underscore';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
    public currentPerson: any;

    public people: { [key: string]: any[] } = {};

    private gettingPerson: boolean;

    constructor(
        private dataSvc: DataService,
        private route: ActivatedRoute,
        private _router: Router,
        private _location: Location,
    ) {
        this.route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params['key']);
        });
    }

    async ngOnInit() {
        // Pre-load person?
        const key = this.route.snapshot.paramMap.get('key');
        if (key) {
            this.getPerson(key);
            // TODO: load all other only on modal close
            // return;
        }

        const query = `   
            {
                allPeople {
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

        const response = await this.dataSvc.getSet('team', query);
        const content = response['allPeople'];

        this.people['faculty'] = _.filter(
            content,
            person => person.category === 'faculty leadership',
        );
        this.people['staff'] = _.filter(
            content,
            person => person.category === 'staff',
        );
        this.people['board'] = _.filter(
            content,
            person => person.category === 'advisory board',
        );
        this.people['fellows'] = _.filter(
            content,
            person => person.category === 'faculty fellows',
        );
        // this.people['students'] = response['students'];

        // We have to add dummy/empty people to categories with non-x4 count to allow for correct flex layout
        Object.keys(this.people).forEach(personKey => {
            const mod = 4 - (this.people[personKey].length % 4);
            if (mod !== 4) {
                for (let i = 0; i < mod; i += 1) {
                    this.people[personKey].push({ name: 'dummy' });
                }
            }
        });
    }

    async getPerson(key) {
        // No dupe requests!
        if (this.gettingPerson) return;

        this.gettingPerson = true;
        this.currentPerson = undefined;
        this.currentPerson = await this.dataSvc.getSet('team', key);
    }

    closePerson() {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this._router.navigateByUrl('people');

        // window.scrollTo(0, 0);
    }
}
