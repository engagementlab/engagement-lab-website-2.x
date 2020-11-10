import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ProjectIndexComponent } from './index.component';
import { ProjectArchiveComponent } from './archive.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
    { path: '', component: ProjectIndexComponent },
    { path: 'archive', component: ProjectArchiveComponent },
    {
        path: ':key',
        component: ProjectComponent,
        data: {
            animation: { value: 'project' },
        },
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes), BrowserAnimationsModule],
    exports: [RouterModule],
})
export class ProjectsModule {}
