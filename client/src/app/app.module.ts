import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ScullyLibModule } from '@scullyio/ng-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config';

// Utils
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';
import { ButtonComponent } from './utils/app-button/button.component';
import { PrettyUrlPipe } from './utils/pretty-url.pipe';

import { AboutComponent } from './about/about.component';
import { AuthorFormatPipe } from './utils/author-format.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact/contact.component';
import { DataService } from './utils/data.service';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InitiativeComponent } from './initiatives/initiative.component';
import { JobsComponent } from './jobs/jobs.component';
import { MastersComponent } from './masters/masters.component';
import { NavComponent } from './nav/nav.component';
import { PeopleGridComponent } from './team/people-grid.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProjectArchiveComponent } from './projects/archive.component';
import { ProjectComponent } from './projects/project.component';
import { ProjectIndexComponent } from './projects/index.component';
import { PublicationComponent } from './publications/publication.component';
import { PublicationIndexComponent } from './publications/index.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectService } from './utils/redirect.service';
import { ResultComponent } from './nav/result.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

export const cloudinary = {
    Cloudinary: CloudinaryCore,
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
    declarations: [
        AppComponent,

        CdnImageComponent,

        // Components
        AboutComponent,
        ContactComponent,
        ErrorComponent,
        FooterComponent,
        HomeComponent,
        JobsComponent,
        InitiativeComponent,
        MastersComponent,
        NavComponent,
        PrivacyComponent,
        PeopleGridComponent,
        ProjectArchiveComponent,
        ProjectComponent,
        ProjectIndexComponent,
        PublicationComponent,
        PublicationIndexComponent,
        RedirectComponent,
        ResultComponent,

        // Utils
        AuthorFormatPipe,
        ButtonComponent,
        PrettyUrlPipe,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'elabHome' }),
        BrowserAnimationsModule,
        BrowserTransferStateModule,
        CommonModule,
        CloudinaryModule.forRoot(cloudinary, config),
        HttpClientModule,
        ScrollToModule.forRoot(),
        ScullyLibModule.forRoot({ useTranferState: true }),
        AppRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [DataService, RedirectService],
    bootstrap: [AppComponent],
})
export class AppModule {}
