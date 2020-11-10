import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventIndexComponent } from './index.component';
import { EventComponent } from './event.component';

const routes: Routes = [
    {
        path: '',
        component: EventIndexComponent,
    },
    {
        path: ':key',
        component: EventComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventsModule {}
