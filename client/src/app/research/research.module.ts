import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchComponent } from './research.component';
import { ProjectIndexComponent } from './projects/index.component';
import { PublicationIndexComponent } from './publications/index.component';
import { InitiativeComponent } from './initiatives/initiative.component';
import { ProjectComponent } from './projects/project.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                // Redir base route to projects
                path: '',
                redirectTo: 'projects',
                component: ResearchComponent,
                pathMatch: 'full',
            },
            {
                path: 'projects',
                component: ProjectIndexComponent,
                pathMatch: 'full',
            },
            { path: 'projects/:key', component: ProjectComponent },
            {
                path: 'publications',
                component: PublicationIndexComponent,
                pathMatch: 'full',
            },
            {
                path: 'initiatives/:key',
                component: InitiativeComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [ResearchComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResearchModule {}
