import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MastersComponent } from './masters/masters.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { JobsComponent } from './jobs/jobs.component';
import { ErrorComponent } from './error/error.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectService } from './utils/redirect.service';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },

    {
        path: 'projects',
        loadChildren: () => {
            return import('./projects/projects.module').then(m => m.ProjectsModule);
        },
    },

    // { path: 'getinvolved', component: ContactComponent },

    // { path: 'cmap', component: MastersComponent },
    // { path: 'masters', component: MastersComponent },
    // { path: 'masters/cohort/:key', component: MastersComponent },

    // { path: 'contact', component: ContactComponent },
    // { path: 'press', component: ContactComponent },

    // { path: 'privacy', component: PrivacyComponent },
    // { path: 'jobs', component: JobsComponent },

    // { path: 'error', component: ErrorComponent },

    // { path: 'redirect', component: RedirectComponent, canActivate:[RedirectService] },

    // { path: 'pokemon', component: RedirectComponent, canActivate:[RedirectService], data: {
    //     externalUrl: 'https://www.launchpad6.com/contestpad'
    //   }
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
