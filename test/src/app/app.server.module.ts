import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
  imports: [
    AppModule,
    CommonModule,
    ModuleMapLoaderModule,    
    RouterModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
