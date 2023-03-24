import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-undergraduate',
    templateUrl: './undergraduate.component.html',
    styleUrls: ['./undergraduate.component.scss'],
})
export class UndergraduateComponent implements OnInit {
    public content: any;
    public academicYears: any;

    public videoUrl: SafeResourceUrl;
    public videoDisplayToggle: boolean;

    constructor(
        private dataSvc: DataService,
        private sanitizer: DomSanitizer,
    ) {}

    async ngOnInit(): Promise<any> {
        const query = `
        {
            allYears {
                label
            }
          allUndergraduatePages {
            description {
                html
            }
            curriculumDescription {
                html
            }
          }
        }
      `;

        const response = await this.dataSvc.getSet('undergraduate', query);

        this.content = response['allUndergraduatePages'];
        this.academicYears = response['allYears'];
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://player.vimeo.com/video/744697164?autoplay=1&color=00ab9e&byline=0&portrait=0`,
        );
    }
    embedVideo() {
        this.videoDisplayToggle = true;
    }
}
