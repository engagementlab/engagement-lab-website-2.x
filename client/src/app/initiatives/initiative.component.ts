import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { ActivatedRoute } from '@angular/router';

// import * as AOS from 'aos';

@Component({
    selector: 'app-initiative',
    templateUrl: './initiative.component.html',
    styleUrls: ['./initiative.component.scss'],
})
export class InitiativeComponent implements OnInit {
    public initiativeType: string;
    public content: any;

    private upperBg: HTMLElement;

    constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {
        this.upperBg = document.getElementById('initiative-bg');
        const logoClasses = document.getElementById('logo-img').classList;
        this._route.params.subscribe(async params => {
            this.initiativeType = params['key'];

            const response = await this._dataSvc.getSet('initiative', this.initiativeType);

            this.content = response;

            this.upperBg.classList.value = this.initiativeType;
            // TweenLite.fromTo(this.upperBg, 1, {autoAlpha:0}, {autoAlpha:1, display:'block', delay:1});

            this.upperBg.classList.add('show');
            logoClasses.add('white');
        });
    }

    ngOnInit() {}
}
