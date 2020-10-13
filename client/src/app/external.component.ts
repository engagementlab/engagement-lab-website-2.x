import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hygiene',
    template: `
        <p>
            Redirecting...
        </p>
    `,
    styles: [],
})
export class ExternalRedirectComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        const dest = this.router.url;
        const hygieneUrl = 'https://hygiene.elab.emerson.edu';

        if (dest === '/unlockinghealth')
            window.location.href = 'https://unlockinghealth.azureedge.net/';
        else {
            window.location.href = `${hygieneUrl}${window.location.pathname.replace(
                'hygiene',
                '',
            )}`;
        }
    }
}
