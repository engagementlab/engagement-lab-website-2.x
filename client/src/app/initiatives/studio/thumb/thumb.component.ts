import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'studio-thumb',
    templateUrl: './thumb.component.html',
    styleUrls: ['./thumb.component.scss'],
})
export class StudioThumbComponent implements OnInit {
    @Input() studio: any;

    constructor() {}

    ngOnInit(): void {}
}
