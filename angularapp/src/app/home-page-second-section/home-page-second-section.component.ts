import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-page-second-section',
    templateUrl: './home-page-second-section.component.html',
    styleUrls: ['./home-page-second-section.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class HomePageSecondSectionComponent {
  firstShoeSectionRendered:boolean=false;
  secondShoeSectionRendered:boolean=false;
  @ViewChild('firstShoeCard') firstShoeCard!: ElementRef;
  @ViewChild('secondShoeCard') secondShoeCard!: ElementRef;
  @ViewChild('thirdShoeCard') thirdShoeCard!: ElementRef;
  @ViewChild('fourthShoeCard') fourthShoeCard!: ElementRef;
  @ViewChild('firstShoeCardSection') firstShoeCardSection!: ElementRef;
  @ViewChild('secondShoeCardSection') secondShoeCardSection!: ElementRef;
  ngAfterViewInit() {
    const threshold = 0.5; // how much % of the element is in view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const className = entry.target.id;
                  if(className == "firstShoeCardSection"){
                    const firstShoe = this.firstShoeCard.nativeElement;
                    const secondShoe = this.secondShoeCard.nativeElement;
                    firstShoe.style.transform = 'translateY(0px)';
                    firstShoe.style.opacity = 1;
                    secondShoe.style.transform = 'translateY(0px)';
                    secondShoe.style.opacity = 1;
                    this.firstShoeSectionRendered = true;
                  }else if (className == "secondShoeCardSection"){
                    const thirdShoe = this.thirdShoeCard.nativeElement;
                    const fourthShoe = this.fourthShoeCard.nativeElement;
                    thirdShoe.style.transform = 'translateY(0px)';
                    thirdShoe.style.opacity = 1;
                    fourthShoe.style.transform = 'translateY(0px)';
                    fourthShoe.style.opacity = 1;
                    this.secondShoeSectionRendered=true;
                  }
                  if(this.firstShoeSectionRendered && this.secondShoeSectionRendered){
                    observer.disconnect();
                  }
                }
            });
        },
        { threshold }
    );
    observer.observe(this.firstShoeCardSection.nativeElement);
    observer.observe(this.secondShoeCardSection.nativeElement);
}
}
