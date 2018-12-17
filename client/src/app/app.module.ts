import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

// Utils
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';
import { ButtonComponent } from './utils/app-button/button.component';
import { PrettyUrlPipe } from './utils/pretty-url.pipe';

// NPM
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './projects/project.component';
import { ProjectIndexComponent } from './projects/index.component';
import { HomeComponent } from './home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TeamComponent } from './team/team.component';
import { RedirectComponent } from './redirect/redirect.component';

import { DataService } from './utils/data.service';
import { RedirectService } from './utils/redirect.service';
import { PeopleGridComponent } from './team/people-grid.component';
import { PublicationIndexComponent } from './publications/index.component';
import { AuthorFormatPipe } from './utils/author-format.pipe';
import { PublicationComponent } from './publications/publication.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

// App routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },  
  { path: 'team', component: TeamComponent },  
  { path: 'team/:key', component: TeamComponent },  
  
  { path: 'projects', component: ProjectIndexComponent },
  { path: 'projects/:key', component: ProjectComponent },

  { path: 'publications', component: PublicationIndexComponent },

  { path: 'pokemon', component: RedirectComponent, canActivate:[RedirectService], data: {
      externalUrl: 'https://www.launchpad6.com/contestpad'
    }
  },

  // TEMP redirects
  { path: 'cmap', component: RedirectComponent, canActivate:[RedirectService], data: {
      externalUrl: 'https://www.emerson.edu/academics/media-design-ma'
    } 
  },
  { path: 'masters', component: RedirectComponent, canActivate:[RedirectService], data: {
      externalUrl: 'https://www.emerson.edu/academics/media-design-ma'
    } 
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectIndexComponent,
    ProjectComponent,
    NavComponent,
    FooterComponent,
    CdnImageComponent,
    ButtonComponent,
    PrettyUrlPipe,
    AboutComponent,
    TeamComponent,
    RedirectComponent,
    PeopleGridComponent,
    PublicationIndexComponent,
    AuthorFormatPipe,
    PublicationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CloudinaryModule.forRoot(cloudinary, config),
    HttpClientModule,
    RouterModule.forRoot(routes),
    ScrollToModule.forRoot()
  ],
  providers: [
    DataService,
    RedirectService,
    Title
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
