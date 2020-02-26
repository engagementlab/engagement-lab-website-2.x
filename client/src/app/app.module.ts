import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config';

// Utils
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';
import { ButtonComponent } from './utils/app-button/button.component';
import { PrettyUrlPipe } from './utils/pretty-url.pipe';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RedirectService } from './utils/redirect.service';
import { ProjectComponent } from './projects/project.component';
import { ProjectIndexComponent } from './projects/index.component';
import { PublicationIndexComponent } from './publications/index.component';
import { AboutComponent } from './about/about.component';
import { RedirectComponent } from './redirect/redirect.component';
import { PublicationComponent } from './publications/publication.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MastersComponent } from './masters/masters.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProjectArchiveComponent } from './projects/archive.component';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './nav/result.component';
import { AuthorFormatPipe } from './utils/author-format.pipe';
import { HomeComponent } from './home.component';
import { DataService } from './utils/data.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
  declarations: [
    AppComponent,

    CdnImageComponent,

    // Components
    HomeComponent,
    NavComponent,
    FooterComponent,

    ProjectComponent,
    ProjectIndexComponent,
    PublicationIndexComponent,
    AboutComponent,
    RedirectComponent,
    PublicationComponent,
    ContactComponent,
    PrivacyComponent,
    MastersComponent,
    JobsComponent,
    ProjectArchiveComponent,
    ErrorComponent,
    ResultComponent,

    // Utils
    AuthorFormatPipe,
    ButtonComponent,
    PrettyUrlPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    CommonModule,
    CloudinaryModule.forRoot(cloudinary, config),
    HttpClientModule,
    ScrollToModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DataService,
    RedirectService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
