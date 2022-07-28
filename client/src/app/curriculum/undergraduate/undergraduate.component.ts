import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-undergraduate',
    templateUrl: './undergraduate.component.html',
    styleUrls: ['./undergraduate.component.scss'],
})
export class UndergraduateComponent implements OnInit {
    public content: any;
    public studios: any;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<any> {
        const query = `
        {
          allUndergraduatePages {
            description {
                html
            }
            studiosDescription {
                html
            }
            currentStudiosYear
          }
          currentUndergraduateStudios {
            name
            description {
              html
            }
            faculty {
                key
                name {
                    first
                    last
                }
                image {
                    public_id
                }
            }
          }
        }
      `;

        const response = await this.dataSvc.getSet('undergraduate', query);

        this.content = response['allUndergraduatePages'];
        this.studios = response['currentUndergraduateStudios'];
    }
}
