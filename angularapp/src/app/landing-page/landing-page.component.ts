import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    standalone: true,
    imports: [MatButtonModule, RouterLink]
})
export class LandingPageComponent {
  constructor(){

  }

  changeShoeImageSrc(color: string){
    var shoeImg = (<HTMLImageElement>document.querySelector(".landing-page-shoe-image"));
    var imgOne = (<HTMLImageElement>document.querySelector(".landing-page-img-1"));
    var imgTwo = (<HTMLImageElement>document.querySelector(".landing-page-img-2"));
    var imgThree = (<HTMLImageElement>document.querySelector(".landing-page-img-3"));
    if(color=="aqua"){
      imgOne.classList.remove("fade");
      imgTwo.classList.add("fade");
      imgThree.classList.add("fade");
    }else if(color=="purple"){
      imgOne.classList.add("fade");
      imgTwo.classList.remove("fade");
      imgThree.classList.add("fade");
    }else{
      imgOne.classList.add("fade");
      imgTwo.classList.add("fade");
      imgThree.classList.remove("fade");
    }
  }
}
