import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-brand-logos',
    templateUrl: './brand-logos.component.html',
    styleUrls: ['./brand-logos.component.css'],
    standalone: true
})
export class BrandLogosComponent {
  @ViewChild('brandLogoContainer') brandLogoContainer!: ElementRef;
  @ViewChild('brand1') brand1!: ElementRef;
  @ViewChild('brand2') brand2!: ElementRef;
  @ViewChild('brand3') brand3!: ElementRef;
  @ViewChild('brand4') brand4!: ElementRef;
  @ViewChild('brand5') brand5!: ElementRef;
  @ViewChild('brand6') brand6!: ElementRef;
  @ViewChild('brand7') brand7!: ElementRef;

  ngAfterViewInit() {
    const threshold = 0.3; // how much % of the element is in view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const className = entry.target.id;
                  const brand1 = this.brand1.nativeElement;
                  const brand2 = this.brand2.nativeElement;
                  const brand3 = this.brand3.nativeElement;
                  const brand4 = this.brand4.nativeElement;
                  const brand5 = this.brand5.nativeElement;
                  const brand6 = this.brand6.nativeElement;
                  const brand7 = this.brand7.nativeElement;
                  brand1.style.transform = 'translateY(0px)';
                  brand1.style.opacity = 1;
                  brand2.style.transform = 'translateY(0px)';
                  brand2.style.opacity = 1;
                  brand3.style.transform = 'translateY(0px)';
                  brand3.style.opacity = 1;
                  brand4.style.transform = 'translateY(0px)';
                  brand4.style.opacity = 1;
                  brand5.style.transform = 'translateY(0px)';
                  brand5.style.opacity = 1;
                  brand6.style.transform = 'translateY(0px)';
                  brand6.style.opacity = 1;
                  brand7.style.transform = 'translateY(0px)';
                  brand7.style.opacity = 1;
                }
              });
        },
        { threshold }
    );
    observer.observe(this.brandLogoContainer.nativeElement);
  }
}
