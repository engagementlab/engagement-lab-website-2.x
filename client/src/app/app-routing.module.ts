import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home.component';
import { MastersComponent } from './masters/masters.component';
import { InitiativeComponent } from './initiatives/initiative.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'about',
        loadChildren: () => {
            return import('./lazy-routes.module').then(m => m.LazyRoutesModule);
        },
    },

    {
        path: 'projects',
        loadChildren: () => {
            return import('./projects/projects.module').then(m => m.ProjectsModule);
        },
    },

    { path: 'initiatives', component: InitiativeComponent },
    { path: 'cmap', redirectTo: 'masters' },
    { path: 'masters', component: MastersComponent },
    { path: 'masters/cohort/:key', component: MastersComponent },

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
