import { Component, OnInit } from '@angular/core';
import { DataService } from '../../utils/data.service';
import { ActivatedRoute } from '@angular/router';

// import * as AOS from 'aos';

@Component({
    selector: 'app-initiative',
    templateUrl: './initiative.component.html',
    styleUrls: ['./initiative.component.scss'],
})
export class InitiativeComponent implements OnInit {
    public initiativeType: string;
    public content: any;

    private upperBg: HTMLElement;

    constructor(private dataSvc: DataService, private _route: ActivatedRoute) {
        this.upperBg = document.getElementById('initiative-bg');
        const logoClasses = document.getElementById('logo-img').classList;
        this._route.params.subscribe(async params => {
            this.initiativeType = params['key'];

            const query = `
                {
                    getInitiative(key: "${this.initiativeType}") {
                        key
                        name
                        description
                        longDescription
                        image {
                            public_id
                        }
                        featuredProject {
                            name
                            key
                            image {
                                public_id
                            }
                        }
                        featuredProjectBlurb
                        projects {
                            name
                            key
                            image {
                                public_id
                            }
                            startYear
                            endYear
                        }
                        
                    }
                }
            `;

            const result = await this.dataSvc.getSetWithKey(
                'initiatives',
                this.initiativeType,
                query,
            );
            this.content = result['getInitiative'];

            // Set/show flood BG image
            this.upperBg.classList.value = this.initiativeType;
            this.upperBg.classList.add('show');
            logoClasses.add('white');
        });
    }

    ngOnInit() {}
}
