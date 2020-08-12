import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-cocurricular',
    templateUrl: './cocurricular.component.html',
    styleUrls: ['./cocurricular.component.scss'],
})
export class StudiosCocurricularComponent implements OnInit {
    public content: any;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
          {
            studiosIntro {
                coCurricularSummary
                coCurricularSummaryImage
                {
                    public_id
                }
                coCurricularPhases
                currentCoCurricularStudios
                {
                    thumb {
                        public_id
                    }
                    name
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
            'cocurricular',
            query,
        );
        this.content = response['studiosIntro'];
    }
}
