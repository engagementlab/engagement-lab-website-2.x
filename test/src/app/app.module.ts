import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


// NPM
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Utils
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';
import { ButtonComponent } from './utils/app-button/button.component';
import { PrettyUrlPipe } from './utils/pretty-url.pipe';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


import { AboutComponent } from './about/about.component';
import { ProjectArchiveComponent } from './projects/archive.component';

import { PublicationComponent } from './publications/publication.component';

import { ContactComponent } from './contact/contact.component';
import { MastersComponent } from './masters/masters.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { JobsComponent } from './jobs/jobs.component';
import { RedirectComponent } from './redirect/redirect.component';

import { ProjectComponent } from './projects/project.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectIndexComponent } from './projects/index.component';
import { PublicationIndexComponent } from './publications/index.component';

import { AuthorFormatPipe } from './utils/author-format.pipe';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './nav/result.component';

import { RedirectService } from './utils/redirect.service';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';
import { CommonModule } from '@angular/common';

export const cloudinary = {
    Cloudinary: CloudinaryCore
  };
  export const config: CloudinaryConfiguration = cloudinaryConfiguration;

// App routes
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },  
    
    { path: 'projects', component: ProjectIndexComponent },
    { path: 'projects/archive', component: ProjectArchiveComponent },
    
    { path: 'getinvolved', component: ContactComponent },
  
    { path: 'cmap', component: MastersComponent },
    { path: 'masters', component: MastersComponent },
    { path: 'masters/cohort/:key', component: MastersComponent },
  
    { path: 'contact', component: ContactComponent },
    { path: 'press', component: ContactComponent },
  
    { path: 'privacy', component: PrivacyComponent },
    { path: 'jobs', component: JobsComponent },
    
    { path: 'error', component: ErrorComponent },
  
    { path: 'redirect', component: RedirectComponent, canActivate:[RedirectService] },
  
    { path: 'pokemon', component: RedirectComponent, canActivate:[RedirectService], data: {
        externalUrl: 'https://www.launchpad6.com/contestpad'
      }
    },

];

@NgModule({
    declarations: [
        AppComponent,
      HomeComponent,
      NavComponent, 
      FooterComponent,
      ProjectComponent,
      ProjectIndexComponent,
      PublicationIndexComponent,

      PrettyUrlPipe,
      CdnImageComponent,
      ButtonComponent,
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
      AuthorFormatPipe,
      PrettyUrlPipe,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        CloudinaryModule.forRoot(cloudinary, config),
        ScrollToModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: 
    [
    RedirectService,
    ]
})

export class AppModule { }
