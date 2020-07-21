import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { MastersComponent } from './masters/masters.component';
import { MastersPeopleComponent } from './masters/people/people.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectService } from './utils/redirect.service';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'about',
        loadChildren: () =>
            import('./about/about.module').then(m => m.AboutModule),
    },

    {
        path: 'initiatives',
        loadChildren: () =>
            import('./initiatives/initiatives.module').then(
                m => m.InitiativesModule,
            ),
    },

    {
        path: 'events',
        loadChildren: () =>
            import('./events/events.module').then(m => m.EventsModule),
    },

    {
        path: 'research',
        loadChildren: () =>
            import('./research/research.module').then(m => m.ResearchModule),
    },

    // {
    //     path: 'publications',
    //     loadChildren: () =>
    //         import('./publications/publications.module').then(
    //             m => m.PublicationsModule,
    //         ),
    // },

    // Preserve old paths (pre-v2.5)
    { path: 'projects', redirectTo: 'research/projects' },
    { path: 'projects/:key', redirectTo: 'research/projects/:key' },
    { path: 'publications', redirectTo: 'research/publications' },

    // TODO: load lazily
    { path: 'people', component: TeamComponent },
    { path: 'people/:key', component: TeamComponent },

    { path: 'cmap', redirectTo: 'masters' },
    { path: 'masters', component: MastersComponent },
    { path: 'masters/people', component: MastersPeopleComponent },
    { path: 'masters/people/:key', component: MastersPeopleComponent },

    { path: 'contact', redirectTo: 'getinvolved' },
    { path: 'press', redirectTo: 'getinvolved' },
    { path: 'getinvolved', component: ContactComponent },

    { path: 'privacy', component: PrivacyComponent },
    { path: 'jobs', component: JobsComponent },

    { path: 'error', component: ErrorComponent },

    {
        path: 'redirect',
        component: RedirectComponent,
        canActivate: [RedirectService],
    },

    {
        path: 'pokemon',
        component: RedirectComponent,
        canActivate: [RedirectService],
        data: {
            externalUrl: 'https://www.launchpad6.com/contestpad',
        },
    },

    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
