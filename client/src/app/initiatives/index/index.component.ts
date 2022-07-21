import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { DataService } from 'src/app/utils/data.service';

import * as _ from 'underscore';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-studios-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],

    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0)' }),
                animate(
                    '.2s cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                    style({ transform: 'scale(1)', opacity: 1 }),
                ),
            ]),
            transition(':leave', [
                style({ transform: 'scale(1)' }),
                animate(
                    '.2s cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                    style({ transform: 'scale(0)', opacity: 0 }),
                ),
            ]),
        ]),
    ],
})
export class StudiosIndexComponent implements OnInit {
    public content: any;
    public videoUrl: string;

    constructor(
        private dataSvc: DataService,
        private sanitizer: DomSanitizer,
    ) {}

    async ngOnInit(): Promise<void> {
        const query = `
          {
            studiosIntro {
                  summary
                  initiativesSummary
                  video
            }

            allStudioInitiatives {
              key
              name
              description
              studios {
                key
              }
              thumb { 
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
        this.content = response;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://player.vimeo.com/video/${this.content.studiosIntro.video}?autoplay=1&color=00ab9e&byline=0&portrait=0`,
        ) as string;
    }
}
