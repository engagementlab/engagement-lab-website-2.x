import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { InitiativeComponent } from './initiatives/initiative.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'initiatives/:key', component: InitiativeComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LazyRoutesModule {}
