import { Component, ViewChildren, QueryList, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { tns, TinySliderInstance, TinySliderInfo } from 'tiny-slider/src/tiny-slider';

@Component({
    selector: 'people-grid',
    templateUrl: './people-grid.component.html',
    styleUrls: ['./people-grid.component.scss'],
})
export class PeopleGridComponent implements AfterViewInit, OnDestroy {
    @Input() people: any[];
    @Input() preview: boolean;
    @Input() cohort: boolean;
    @Input() title: string;

    @ViewChildren('teamList') list: QueryList<any>;

    private slider: TinySliderInstance;

    constructor() {}

    ngAfterViewInit() {
        if (!this.preview) return;

        this.list.changes.subscribe(t => {
            // Create slider once staff list pouplates
            this.slider = tns({
                container: '#list',
                items: 3,
                slideBy: 1,
                gutter: 28,
                fixedWidth: 270,
                autoplay: false,
                nav: false,
                arrowKeys: true,
                mouseDrag: true,
                controlsContainer: document.getElementById('controls'),
            });
            this.slider.events.on('transitionStart', (info: TinySliderInfo) => {
                // Make sure any slides in queue are not invisible
                // This is a workaround for apparent bug in tns with class used by BrowserAnimationsModule
                document.querySelectorAll('.tns-item.tns-slide-active:not(.ng-star-inserted)').forEach(el => {
                    el.classList.add('visible');
                });
            });
        });
    }

    ngOnDestroy() {
        // Destroy slider when user leaves
        if (this.slider) this.slider.destroy();
    }
}
