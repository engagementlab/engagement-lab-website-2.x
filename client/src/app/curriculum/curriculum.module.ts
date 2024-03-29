import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GraduateCurriculumComponent } from './graduate/graduate.component';
import { UndergraduateComponent } from './undergraduate/undergraduate.component';
import { UndergraduateStudiosComponent } from './studios/studios.component';

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
            {
                path: 'graduate',
                component: GraduateCurriculumComponent,
                pathMatch: 'full',
            },
            {
                path: 'graduate/faculty/:key',
                component: GraduateCurriculumComponent,
                pathMatch: 'full',
            },
            {
                path: 'graduate/students/:key',
                component: GraduateCurriculumComponent,
                pathMatch: 'full',
            },
            {
                path: 'undergraduate',
                component: UndergraduateComponent,
                pathMatch: 'full',
            },
            {
                path: 'studios',
                component: UndergraduateStudiosComponent,
                pathMatch: 'full',
            },
            {
                path: 'studios/faculty/:key',
                component: UndergraduateStudiosComponent,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [],
})
export class CurriculumModule {}
