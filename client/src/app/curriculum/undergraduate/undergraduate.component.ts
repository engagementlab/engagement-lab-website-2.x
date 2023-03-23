import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/utils/data.service';

@Component({
    selector: 'app-undergraduate',
    templateUrl: './undergraduate.component.html',
    styleUrls: ['./undergraduate.component.scss'],
})
export class UndergraduateComponent implements OnInit {
    public content: any;
    public academicYears: any;

    public currentPerson: any;
    private gettingPerson: boolean;

    public videoUrl: SafeResourceUrl;
    public videoDisplayToggle: boolean;

    constructor(
        private dataSvc: DataService,
        private router: Router,
        private _route: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {
        this._route.params.subscribe(params => {
            if (Object.keys(params).length < 1) return;
            this.getPerson(params.key);
        });
    }

    async ngOnInit(): Promise<any> {
        // Pre-load person
        const key = this._route.snapshot.paramMap.get('key');
        if (key) this.getPerson(key);

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
              category
              relatedLinks
              contact
            }
        }`;

        const response = await this.dataSvc.getSetWithKey(
            'undergraduate-faculty',
            key,
            query,
        );
        this.currentPerson = response['getPerson'];
    }

    closePerson(): void {
        this.gettingPerson = false;
        this.currentPerson = undefined;

        this.router.navigateByUrl('curriculum/undergraduate');
    }
}
