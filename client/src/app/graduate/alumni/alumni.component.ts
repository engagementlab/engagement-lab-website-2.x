import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/utils/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';

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
        let tl = anime.timeline({
            easing: 'easeOutCirc',
            duration: 1250,
            loop: true,
        });

        // Add children
        tl.add({
            targets: '.slider #scholars',
            translateY: '0%',
            duration: 1000,
        });
        tl.add({
            targets: '.slider #scholars',
            translateY: '-100%',
            delay: 2000,
        });
        tl.add({
            targets: '.slider #designers',
            translateY: '-100%',
        });
        tl.add({
            targets: '.slider #designers',
            translateY: '-200%',
            delay: 2000,
        });
        tl.add({
            targets: '.slider #makers',
            translateY: '-200%',
        });
        tl.add({
            targets: '.slider #makers',
            translateY: '-300%',
            delay: 2000,
        });
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
