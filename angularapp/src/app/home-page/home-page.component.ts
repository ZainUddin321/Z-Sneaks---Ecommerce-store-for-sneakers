import { Component, Input } from '@angular/core';
import { Sneakers, SneakersApiService } from '../Services/sneakers-api.service';
import { BrandLogosComponent } from '../brand-logos/brand-logos.component';
import { HomePageSecondSectionComponent } from '../home-page-second-section/home-page-second-section.component';
import { ShowCardSectionComponent } from '../show-card-section/show-card-section.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    standalone: true,
    imports: [LandingPageComponent, ShowCardSectionComponent, HomePageSecondSectionComponent, BrandLogosComponent]
})
export class HomePageComponent {
  sneakers: Sneakers[]=[];
  constructor(private sneakersApi: SneakersApiService) { }
  ngOnInit() {
    this.sneakersApi.getLimitedSneakers(4).subscribe((result) => {
      if (result) {
        this.sneakers = result;
      }
    }, error => console.error(error));
  }
}
