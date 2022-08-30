import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsIndexComponent } from './index.component';
import { NewsComponent } from './news.component';
import { NewsArchiveComponent } from './archive/archive.component';

const routes: Routes = [
    {
        path: '',
        component: NewsIndexComponent,
    },
    {
        path: ':key',
        component: NewsComponent,
    },
    {
        path: 'archive/:key',
        component: NewsArchiveComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewsModule {}
