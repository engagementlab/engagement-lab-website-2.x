import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-studios-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class StudiosIndexComponent implements OnInit {
    public content: any;
    public partners: any[];

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
          {
            studiosIntro {
                  summary
                  partneredStudiosThumbnail {
                    public_id
                  }
                  graduateThesisThumbnail {
                    public_id
                  }
                  cocurricularThumbnail {
                    public_id
                  }
            }
            allPartners {
              name
              image {
                public_id
              }
            }
          }
      `;
        const response = await this.dataSvc.getSetWithKey(
            'studios',
            'intro',
            query,
        );
        this.content = response['studiosIntro'];
        this.partners = response['allPartners'];
    }
}
