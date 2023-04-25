import { Component, Input } from '@angular/core';
import { Sneakers, SneakersApiService } from '../sneakers-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
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
