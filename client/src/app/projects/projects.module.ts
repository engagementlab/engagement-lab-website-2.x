import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectIndexComponent } from './index.component';
import { ProjectArchiveComponent } from './archive.component';
import { ProjectComponent } from './project.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
    { path: 'projects', component: ProjectIndexComponent },
    { path: 'about', component: AboutComponent },
    // { path: 'archive', component: ProjectArchiveComponent },
    // { path: ':key', component: ProjectComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectsModule {}
