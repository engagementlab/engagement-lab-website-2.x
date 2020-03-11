import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home.component';
import { ProjectIndexComponent } from './projects/index.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pubs', component: AboutComponent },
    // {
    //     path: 'about',
    //     loadChildren: () => {
    //         return import('./lazy-routes.module').then(m => m.LazyRoutesModule);
    //     },
    // },

    // {
    //     path: '*',
    //     loadChildren: () => {
    //         return import('./projects/projects.module').then(m => m.ProjectsModule);
    //     },
    // },

    // { path: 'projects', component: ProjectIndexComponent },

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
