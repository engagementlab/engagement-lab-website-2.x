import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GraduateCurriculumComponent } from './curriculum/curriculum.component';
import { GraduateAlumniComponent } from './alumni/alumni.component';
import { GraduateStudiosComponent } from './studios/studios.component';
import { GraduateInfoComponent } from './info/info.component';
import { GraduateProjectComponent } from './studios/project/project.component';

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
                path: 'faculty/:key',
                component: GraduateCurriculumComponent,
                pathMatch: 'full',
            },
            {
                path: 'students',
                component: GraduateAlumniComponent,
                pathMatch: 'full',
            },
            {
                path: 'students/:key',
                component: GraduateAlumniComponent,
                pathMatch: 'full',
            },
            {
                path: 'apply',
                component: GraduateInfoComponent,
                pathMatch: 'full',
            },
            // {
            //     path: 'projects',
            //     component: GraduateStudiosComponent,
            //     pathMatch: 'full',
            // },
            // {
            //     path: 'projects/:key',
            //     component: GraduateProjectComponent,
            // },
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GraduateModule {}
