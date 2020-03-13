import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home.component';
import { MastersComponent } from './masters/masters.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { JobsComponent } from './jobs/jobs.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'about',
        loadChildren: () => {
            return import('./about/about.module').then(m => m.AboutModule);
        },
    },

    {
        path: 'initiatives',
        loadChildren: () => {
            return import('./initiatives/initiatives.module').then(m => m.InitiativesModule);
        },
    },

    {
        path: 'projects',
        loadChildren: () => {
            return import('./projects/projects.module').then(m => m.ProjectsModule);
        },
    },

    {
        path: 'publications',
        loadChildren: () => {
            return import('./publications/publications.module').then(m => m.PublicationsModule);
        },
    },

    // TODO: load lazily
    { path: 'cmap', redirectTo: 'masters' },
    { path: 'masters', component: MastersComponent },
    { path: 'masters/cohort/:key', component: MastersComponent },

    { path: 'contact', redirectTo: 'getinvolved' },
    { path: 'press', redirectTo: 'getinvolved' },
    { path: 'getinvolved', component: ContactComponent },

    { path: 'privacy', component: PrivacyComponent },
    { path: 'jobs', component: JobsComponent },

    { path: 'error', component: ErrorComponent },

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
