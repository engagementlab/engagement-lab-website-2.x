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
import { AttributionsComponent } from './attributions/attributions.component';
import { ExternalRedirectComponent } from './external.component';

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
        path: 'initiatives',
        loadChildren: () =>
            import('./initiatives/initiatives.module').then(
                m => m.StudiosModule,
            ),
    },

    {
        path: 'news',
        loadChildren: () =>
            import('./news/news.module').then(m => m.NewsModule),
    },

    {
        path: 'research',
        loadChildren: () =>
            import('./research/research.module').then(m => m.ResearchModule),
    },

    {
        path: 'curriculum',
        loadChildren: () =>
            import('./curriculum/curriculum.module').then(
                m => m.CurriculumModule,
            ),
    },
    {
        path: 'partner',
        loadChildren: () =>
            import('./partner/partner.module').then(m => m.PartnerModule),
    },
    {
        path: 'resources',
        loadChildren: () =>
            import('./resources/resources.module').then(m => m.ResourcesModule),
    },

    // Preserve old paths
    {
        path: 'graduate',
        redirectTo: '/curriculum/graduate',
        pathMatch: 'prefix',
    },
    {
        path: 'studios',
        redirectTo: 'initiatives',
    },
    {
        path: 'studios/initiatives/:key',
        redirectTo: 'initiatives/initiative/:key',
    },
    {
        path: 'studios/studio/:key',
        redirectTo: 'initiatives/studio/:key',
    },
    {
        path: 'initiatives/smart-cities',
        redirectTo: 'initiatives',
    },
    {
        path: 'initiatives/trust-and-the-news',
        redirectTo: 'initiatives',
    },

    { path: 'projects', redirectTo: 'research/projects' },
    { path: 'projects/:key', redirectTo: 'research/projects/:key' },
    { path: 'publications', redirectTo: 'research/publications' },

    { path: 'studios/studio/:key', redirectTo: 'initiatives/studio/:key' },

    { path: 'masters', redirectTo: 'curriculum/graduate' },
    { path: 'masters/alumni', redirectTo: 'curriculum/graduate' },
    { path: 'masters/cohort/:key', redirectTo: 'curriculum/graduate' },

    // Redirect to other Azure static sites
    { path: 'hygiene/:path?', component: ExternalRedirectComponent },
    { path: 'unlockinghealth', component: ExternalRedirectComponent },

    // TODO: load lazily
    { path: 'people', component: TeamComponent },
    { path: 'people/:key', component: TeamComponent },

    { path: 'cmap', redirectTo: 'graduate' },

    { path: 'contact', redirectTo: 'getinvolved' },
    { path: 'press', redirectTo: 'getinvolved' },
    { path: 'getinvolved', component: ContactComponent },

    { path: 'privacy', component: PrivacyComponent },
    { path: 'attributions', component: AttributionsComponent },
    { path: 'jobs', component: JobsComponent },

    { path: 'error', component: ErrorComponent },

    {
        path: 'redirect',
        component: RedirectComponent,
        canActivate: [RedirectService],
    },

    { path: 'uh-oh', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
