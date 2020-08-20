import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
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
        path: 'events',
        loadChildren: () =>
            import('./events/events.module').then(m => m.EventsModule),
    },

    {
        path: 'studios',
        loadChildren: () =>
            import('./studios/studios.module').then(m => m.StudiosModule),
    },

    {
        path: 'research',
        loadChildren: () =>
            import('./research/research.module').then(m => m.ResearchModule),
    },

    {
        path: 'graduate',
        loadChildren: () =>
            import('./graduate/graduate.module').then(m => m.GraduateModule),
    },
    {
        path: 'resources',
        loadChildren: () =>
            import('./resources/resources.module').then(m => m.ResourcesModule),
    },

    // Preserve old paths (pre-v2.5)
    {
        path: 'initiatives/smart-cities',
        redirectTo: 'research/initiatives/civic-smart-cities',
    },
    {
        path: 'initiatives/trust-and-the-news',
        redirectTo: 'research/initiatives/engaged-journalism',
    },
    { path: 'initiatives/:key', redirectTo: 'research/initiatives/:key' },

    { path: 'projects', redirectTo: 'research/projects' },
    { path: 'projects/:key', redirectTo: 'research/projects/:key' },
    { path: 'publications', redirectTo: 'research/publications' },

    { path: 'masters', redirectTo: 'graduate' },
    { path: 'masters/alumni', redirectTo: 'graduate/alumni' },

    // TODO: load lazily
    { path: 'people', component: TeamComponent },
    { path: 'people/:key', component: TeamComponent },

    { path: 'cmap', redirectTo: 'masters' },

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
