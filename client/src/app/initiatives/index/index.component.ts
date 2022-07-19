import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { DataService } from 'src/app/utils/data.service';

import * as _ from 'underscore';

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
    public partners: any[];

    public currentStudio: any;
    public currentSelectorKey: string;

    constructor(private dataSvc: DataService) {}

    async ngOnInit(): Promise<void> {
        const query = `
          {
            studiosIntro {
                  summary
                  initiativesSummary
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

            allStudios {
              key
              name
              thumb { 
                  public_id
              }
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
    }

    public applySelector(selector: string) {
        this.currentSelectorKey = null;
        if (!selector) {
            this.currentStudio = null;
            return;
        }

        this.currentStudio = _.findWhere(this.content.allStudioInitiatives, {
            key: selector,
        });
    }

    public isSelected(selector: string) {
        return (
            !this.currentStudio ||
            _.pluck(this.currentStudio.studios, 'key').indexOf(selector) > -1
        );
    }
}
