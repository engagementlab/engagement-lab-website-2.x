import {
    Component, OnInit, ViewChildren, QueryList,
} from '@angular/core';

import * as _ from 'underscore';
import mixitup from 'mixitup';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class PublicationIndexComponent implements OnInit {
    public pubs: any;

    public pubTypesCount: Record<string, any>;

    public pubTypesTotal: number;

    public pubTypeKeys: string[];

    @ViewChildren('publicationList') publicationList: QueryList<any>;

    // eslint-disable-next-line no-useless-constructor
    constructor(private dataSvc: DataService) { }

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allPublications {
                    title
                    key
                    date
                    author
                    blurb
                    context
                    downloadUrls
                    purchaseUrls
                    description {
                        html
                    }
                    form {
                        key
                    }
                }
            }
        `;

        const response = await this.dataSvc.getSet('publications', query);
        this.pubs = response['allPublications'];

        // get count of each pub type
        this.pubTypesCount = _.countBy(this.pubs, obj => obj.form.key);
        this.pubTypesTotal = _.reduce(
            this.pubTypesCount,
            (memo, num) => memo + num,
        );

        // get all pub types and type names
        this.pubTypeKeys = Object.keys(this.pubTypesCount);

        // if not even count of pubs, add a dummy once so last one doesn't span 2 cols
        const { length } = this.pubs;
        if (length % 2 === 1) {
            this.pubs.push({
                form: {
                    key: 'dummy',
                },
            });
        }
    }

    ngAfterViewInit() {
        this.publicationList.changes.subscribe(t => {
            mixitup(document.getElementById('publications'), {
                animation: {
                    effects: 'fade',
                },
            });
        });
    }

    ngOnDestroy() { }
}
