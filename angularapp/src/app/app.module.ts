import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { HomePageSecondSectionComponent } from './home-page-second-section/home-page-second-section.component';
import { BrandLogosComponent } from './brand-logos/brand-logos.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoeCardComponent } from './shoe-card/shoe-card.component';
import { ShowCardSectionComponent } from './show-card-section/show-card-section.component';
import { RouterModule, Routes } from '@angular/router';
import { SneakersPageComponent } from './sneakers-page/sneakers-page.component';
import { SneakerDetailComponent } from './sneaker-detail/sneaker-detail.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sneakers', component: SneakersPageComponent, },
  { path: 'sneaker/:id', component: SneakerDetailComponent},
  { path: '**', component: HomePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    HomePageComponent,
    HomePageSecondSectionComponent,
    BrandLogosComponent,
    FooterComponent,
    ShoeCardComponent,
    ShowCardSectionComponent,
    SneakersPageComponent,
    SneakerDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'top'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
