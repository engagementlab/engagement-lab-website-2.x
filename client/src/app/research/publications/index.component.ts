import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import * as _ from 'underscore';

import { DataService } from '../../utils/data.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class PublicationIndexComponent implements OnInit {
    public publicationsGrouped: any;

    @ViewChildren('publicationList') publicationList: QueryList<any>;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
            {
                allPublications {
                    _id
                    publications 
                    {
                        title
                        key
                        date
                        author
                        blurb
                        context
                        downloadUrls
                        purchaseUrls
                    }
                }
            }
        `;

        const response = await this.dataSvc.getSet('publications', query);
        this.publicationsGrouped = response['allPublications'];
    }

    ngOnDestroy() {}
}
