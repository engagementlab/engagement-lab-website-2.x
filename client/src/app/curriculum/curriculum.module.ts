import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GraduateCurriculumComponent } from './graduate/graduate.component';
import { UndergraduateComponent } from './undergraduate/undergraduate.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                // Redir base route to undergrad
                path: '',
                redirectTo: 'undergraduate',
                pathMatch: 'full',
            },
            // {
            //     // Redir old route to undergrad
            //     path: 'curriculum',
            //     redirectTo: 'undergraduate',
            //     pathMatch: 'full',
            // },
            {
                path: 'graduate',
                component: GraduateCurriculumComponent,
                pathMatch: 'full',
            },
            {
                path: 'undergraduate',
                component: UndergraduateComponent,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [UndergraduateComponent],
})
export class CurriculumModule {}
