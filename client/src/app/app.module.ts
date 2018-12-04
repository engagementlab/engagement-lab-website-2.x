import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

// Utils
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';

// NPM
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './projects/project.component';
import { ProjectIndexComponent } from './projects/index.component';
import { HomeComponent } from './home.component';
import { DataService } from './utils/data.service';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

// App routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent },  
  
  { path: 'projects', component: ProjectIndexComponent },
  { path: 'projects/:key', component: ProjectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    NavComponent,
    FooterComponent,
    CdnImageComponent,
    ProjectIndexComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CloudinaryModule.forRoot(cloudinary, config),
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    // RouterStateService
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
