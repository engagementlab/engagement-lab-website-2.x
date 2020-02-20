import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { DataService } from './utils/data.service';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppModule } from './app.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AppModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    ModuleMapLoaderModule,
    RouterModule,
    ServerModule,
    ServerTransferStateModule
  ],
  providers: [
    DataService,
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppServerModule { }
