import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudiosIndexComponent } from './index/index.component';
import { StudiosPartnerComponent } from './partner/partner.component';
import { StudiosGraduateComponent } from './graduate/graduate.component';
import { StudiosCocurricularComponent } from './cocurricular/cocurricular.component';

const routes: Routes = [
    {
        path: '',
        component: StudiosIndexComponent,
    },
    {
        path: 'partner',
        component: StudiosPartnerComponent,
    },
    {
        path: 'thesis',
        component: StudiosGraduateComponent,
    },
    ,
    {
        path: 'cocurricular',
        component: StudiosCocurricularComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        StudiosPartnerComponent,
        StudiosGraduateComponent,
        StudiosCocurricularComponent,
    ],
})
export class StudiosModule {}
