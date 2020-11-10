import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
    selector: 'app-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
    public content: any[];

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
        {
          
          allTools {
            name
            project
            summary
            url
            date
            file {
              url
            }
            image {
              public_id
            }
          }
        }
    `;
        const response = await this.dataSvc.getSet('tools', query);
        this.content = response['allTools'];
    }
}
