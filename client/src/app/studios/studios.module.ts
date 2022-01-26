import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudiosIndexComponent } from './index/index.component';
import { StudiosPartnerComponent } from './partner/partner.component';
import { StudiosGraduateComponent } from './graduate/graduate.component';
import { StudiosCocurricularComponent } from './cocurricular/cocurricular.component';
import { StudioComponent } from './studio/studio.component';
import { StudioInitiativeComponent } from './initiative/initiative.component';

const routes: Routes = [
    {
        path: '',
        component: StudiosIndexComponent,
    },
    {
        path: 'partnered',
        component: StudiosPartnerComponent,
    },
    {
        path: 'thesis',
        component: StudiosGraduateComponent,
    },
    {
        path: 'cocurricular',
        component: StudiosCocurricularComponent,
    },
    {
        path: 'studio/:key',
        component: StudioComponent,
    },
    {
        path: 'initiatives/:key',
        component: StudioInitiativeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [],
})
export class StudiosModule {}
