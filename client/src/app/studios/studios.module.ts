import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudiosIndexComponent } from './index/index.component';
import { CdnImageComponent } from '../utils/cdn-image/cdn-image.component';

const routes: Routes = [
    {
        path: '',
        component: StudiosIndexComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
            },
            // {
            //     path: 'projects',
            //     component: ProjectIndexComponent,
            //     pathMatch: 'full',
            // },
            // { path: 'projects/:key', component: ProjectComponent },
            // {
            //     path: 'publications',
            //     component: PublicationIndexComponent,
            //     pathMatch: 'full',
            // },
            // {
            //     path: 'initiatives/:key',
            //     component: InitiativeComponent,
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudiosModule {}
