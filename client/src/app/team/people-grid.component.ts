import { Component, OnInit, ViewChildren, QueryList, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { tns, TinySliderInstance } from 'tiny-slider/src/tiny-slider';

@Component({
    selector: 'people-grid',
    templateUrl: './people-grid.component.html',
    styleUrls: ['./people-grid.component.scss'],
})
export class PeopleGridComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() people: any[];
    @Input() preview: boolean;
    @Input() cohort: boolean;

    @ViewChildren('teamList') list: QueryList<any>;

    private slider: TinySliderInstance;

    constructor() {}

    ngOnInit() {}

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
                // loop: false,
                arrowKeys: true,
                mouseDrag: true,
                controlsContainer: document.getElementById('controls'),
            });
        });
    }

    ngOnDestroy() {
        // Destroy slider when user leaves
        if (this.slider) this.slider.destroy();
    }
}
