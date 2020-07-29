import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GraduateCurriculumComponent } from './curriculum/curriculum.component';
import { GraduateAlumniComponent } from './alumni/alumni.component';
import { GraduateStudiosComponent } from './studios/studios.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                // Redir base route to projects
                path: '',
                redirectTo: 'curriculum',
                pathMatch: 'full',
            },
            {
                path: 'curriculum',
                component: GraduateCurriculumComponent,
                pathMatch: 'full',
            },
            {
                path: 'alumni',
                component: GraduateAlumniComponent,
                pathMatch: 'full',
            },
            {
                path: 'studios',
                component: GraduateStudiosComponent,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GraduateModule {}
