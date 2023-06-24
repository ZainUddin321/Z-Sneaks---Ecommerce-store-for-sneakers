import { Component } from '@angular/core';
import { Sneakers,SneakersApiService } from '../Services/sneakers-api.service';
import { debug } from 'console';
@Component({
  selector: 'app-sneakers-page',
  templateUrl: './sneakers-page.component.html',
  styleUrls: ['./sneakers-page.component.css']
})
export class SneakersPageComponent {
  sneakers: Sneakers[][]=[];
  constructor(private sneakersApi: SneakersApiService) { }
  ngOnInit() {
    this.sneakersApi.getAllSneakers().subscribe((result) => {
      if (result) {
        let i=0;
        let j=0;
        for(let sneaker of result){
          this.sneakers[i] = result.slice(j,j+8);
          j+=8;
          i++;
        }
      }
    }, error => console.error(error));
  }
}
