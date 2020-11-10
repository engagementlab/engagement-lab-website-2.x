import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiativeComponent } from './initiative.component';

const routes: Routes = [{ path: ':key', component: InitiativeComponent }];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InitiativesModule {}
