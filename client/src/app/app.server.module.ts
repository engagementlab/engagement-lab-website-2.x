import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

// import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { DataService } from './utils/data.service';

@NgModule({
  imports: [
    AppModule,
    CommonModule,
    // ModuleMapLoaderModule,    
    RouterModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
