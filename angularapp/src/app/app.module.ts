import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { HomePageSecondSectionComponent } from './home-page-second-section/home-page-second-section.component';
import { BrandLogosComponent } from './brand-logos/brand-logos.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoeCardComponent } from './shoe-card/shoe-card.component';
import { ShowCardSectionComponent } from './show-card-section/show-card-section.component';
import { RouterModule, Routes } from '@angular/router';
import { SneakersPageComponent } from './sneakers-page/sneakers-page.component';
import { SneakerDetailComponent } from './sneaker-detail/sneaker-detail.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { NgToastModule } from 'ng-angular-popup';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CartOrderComponent } from './cart-order/cart-order.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sneakers', component: SneakersPageComponent, },
  { path: 'sneaker/:id', component: SneakerDetailComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: '**', component: HomePageComponent }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        NgToastModule,
        FontAwesomeModule,
        RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'top' }),
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
        LoginComponent,
        CartComponent,
        CartSummaryComponent,
        CartOrderComponent
    ],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
