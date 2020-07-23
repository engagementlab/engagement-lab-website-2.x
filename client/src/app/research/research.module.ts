import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchComponent } from './research.component';
import { ProjectIndexComponent } from './projects/index.component';
import { PublicationIndexComponent } from './publications/index.component';
import { InitiativeComponent } from './initiatives/initiative.component';

const routes: Routes = [
    {
        path: '',
        component: ResearchComponent,
        children: [
            {
                path: 'projects',
                component: ProjectIndexComponent,
                pathMatch: 'full',
            },
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

    // Child paths
    // { path: 'projects/:key', redirectTo: 'research/projects/:key' },
];

@NgModule({
    declarations: [ResearchComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResearchModule {}
