import {
    BrowserModule,
    BrowserTransferStateModule,
} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { ScullyLibModule } from '@scullyio/ng-lib';

import { Cloudinary } from 'cloudinary-core';
import {
    CloudinaryConfiguration,
    CloudinaryModule,
} from '@cloudinary/angular-5.x';

// Apollo/Graphql
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import appConfig from './config';

// Utils
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';
import { ButtonComponent } from './utils/app-button/button.component';
import { PrettyUrlPipe } from './utils/pretty-url.pipe';

import { AboutComponent } from './about/about.component';
import { AuthorFormatPipe } from './utils/author-format.pipe';
import { ContactComponent } from './contact/contact.component';
import { DataService } from './utils/data.service';
import { ErrorComponent } from './error/error.component';
import { EventComponent } from './events/event.component';
import { EventIndexComponent } from './events/index.component';
import { FooterComponent } from './footer/footer.component';
import { GraduateCurriculumComponent } from './graduate/curriculum/curriculum.component';
import { GraduateAlumniComponent } from './graduate/alumni/alumni.component';
import { GraduateStudiosComponent } from './graduate/studios/studios.component';
import { GraduateProjectComponent } from './graduate/studios/project/project.component';
import { GraduateInfoComponent } from './graduate/info/info.component';
import { HomeComponent } from './home/home.component';
import { InitiativeComponent } from './research/initiatives/initiative.component';
import { JobsComponent } from './jobs/jobs.component';
import { JoinPipe } from './utils/join.pipe';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PeopleGridComponent } from './team/people-grid.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProjectArchiveComponent } from './research/projects/archive.component';
import { ProjectComponent } from './research/projects/project.component';
import { ProjectIndexComponent } from './research/projects/index.component';
import { PublicationComponent } from './research/publications/publication.component';
import { PublicationIndexComponent } from './research/publications/index.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectService } from './utils/redirect.service';
import { ResultComponent } from './nav/result.component';
import { PersonModalComponent } from './team/person-modal/person-modal.component';
import { PluckPipe } from './utils/pluck.pipe';
import { SlideshowComponent } from './utils/slideshow/slideshow.component';
import { TeamComponent } from './team/team.component';
import { StudiosIndexComponent } from './studios/index/index.component';
import { StudioComponent } from './studios/studio/studio.component';
import { StudiosGraduateComponent } from './studios/graduate/graduate.component';
import { StudiosCocurricularComponent } from './studios/cocurricular/cocurricular.component';
import { StudiosPartnerComponent } from './studios/partner/partner.component';
import { StudioThumbComponent } from './studios/studio/thumb/thumb.component';
import { ResourcesComponent } from './resources/resources.component';
import { PartnerComponent } from './partner/partner.component';

export const cloudinary = {
    Cloudinary,
};
export const config: CloudinaryConfiguration = appConfig;

@NgModule({
    declarations: [
        AppComponent,

        // Components
        AboutComponent,
        ContactComponent,
        ErrorComponent,
        EventIndexComponent,
        EventComponent,
        FooterComponent,
        GraduateCurriculumComponent,
        GraduateAlumniComponent,
        GraduateStudiosComponent,
        GraduateProjectComponent,
        GraduateInfoComponent,
        HomeComponent,
        JobsComponent,
        InitiativeComponent,
        NavComponent,
        NotFoundComponent,
        PartnerComponent,
        PrivacyComponent,
        PeopleGridComponent,
        PersonModalComponent,
        ProjectArchiveComponent,
        ProjectComponent,
        ProjectIndexComponent,
        PublicationComponent,
        PublicationIndexComponent,
        RedirectComponent,
        ResourcesComponent,
        ResultComponent,
        StudiosIndexComponent,
        StudioComponent,
        StudiosGraduateComponent,
        StudiosCocurricularComponent,
        StudiosPartnerComponent,
        StudioThumbComponent,
        TeamComponent,

        // Utils
        AuthorFormatPipe,
        ButtonComponent,
        CdnImageComponent,
        JoinPipe,
        PrettyUrlPipe,
        PluckPipe,
        SlideshowComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'elabHome' }),
        BrowserAnimationsModule,
        BrowserTransferStateModule,
        CommonModule,
        CloudinaryModule.forRoot(cloudinary, config),
        HttpClientModule,
        ScrollToModule.forRoot(),
        ScullyLibModule.forRoot({ useTransferState: true }),
        AppRoutingModule,
        ApolloModule,
        HttpLinkModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        DataService,
        RedirectService,
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                // Apollo link w/ error handling
                const link = httpLink.create({
                    uri: `${environment.data_url}/graphql`,
                });
                // Watch for graphql errors
                const errors = onError(({ graphQLErrors, networkError }) => {
                    if (graphQLErrors) {
                        graphQLErrors.map(({ message, locations, path }) =>
                            console.log(
                                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                            ),
                        );
                    }

                    if (networkError) {
                        console.log(`[GraphQL network error]: ${networkError}`);
                    }
                });

                return {
                    cache: new InMemoryCache(),
                    link: ApolloLink.from([errors, link]),
                };
            },
            deps: [HttpLink],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
