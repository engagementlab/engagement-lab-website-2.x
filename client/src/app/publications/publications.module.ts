import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationIndexComponent } from './index.component';
import { PublicationComponent } from './publication.component';

const routes: Routes = [
    { path: '', component: PublicationIndexComponent },
    { path: ':key', component: PublicationComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicationsModule {}
