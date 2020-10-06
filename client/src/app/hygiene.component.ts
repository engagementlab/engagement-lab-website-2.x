import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hygiene',
    template: `
        <p>
            Redirecting...
        </p>
    `,
    styles: [],
})
export class HygieneComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        const url = 'https://hygiene.elab.emerson.edu';
        window.location.href = `${url}${window.location.pathname.replace(
            'hygiene',
            '',
        )}`;
    }
}
