import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss'],
})
export class StudiosPartnerComponent implements OnInit {
    public content: any;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
          {
            studiosIntro {
                partneredSummary
                partneredCurriculum
                partneredSummaryImage
                {
                    public_id
                }
                currentPartneredStudios
                {
                    key
                    name
                    thumb { 
                        public_id
                    }
                    department
                    sponsor
                    faculty {
                        name {
                            first
                            last
                        }
                    }
                }
                previousPartneredStudios
                {
                    key
                    name
                    thumb { 
                        public_id
                    }
                    department
                    sponsor
                    faculty {
                        name {
                            first
                            last
                        }
                    }
                }
            }
          }
      `;
        const response = await this.dataSvc.getSetWithKey(
            'studios',
            'partner',
            query,
        );
        this.content = response['studiosIntro'];
    }
}
