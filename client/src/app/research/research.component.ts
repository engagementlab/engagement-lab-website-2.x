import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './research.component.html',
    styleUrls: ['./research.component.scss'],
})
export class ResearchComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    public prepareRouteTransition(outlet: any): void {
        const animation = outlet.activatedRouteData.animation || {};
        return animation.value || null;
    }
}
