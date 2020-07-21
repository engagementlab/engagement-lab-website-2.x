import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchComponent } from './research.component';
import { ProjectIndexComponent } from './projects/index.component';

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
        ],
    },

    // Child paths
    // { path: 'projects/:key', redirectTo: 'research/projects/:key' },
    // { path: 'publications', redirectTo: 'research/publications' },
];

@NgModule({
    declarations: [ResearchComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResearchModule {}
