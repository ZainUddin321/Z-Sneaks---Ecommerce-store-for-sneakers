import { Component } from '@angular/core';
import { Sneakers, SneakersApiService } from '../Services/sneakers-api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { userInfo } from 'os';
import { AuthService } from '../Services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-sneaker-detail',
    templateUrl: './sneaker-detail.component.html',
    styleUrls: ['./sneaker-detail.component.css'],
    standalone: true,
    imports: [NgFor, MatButtonModule, NgIf]
})
export class SneakerDetailComponent {
  sneaker: Sneakers={
    boxCondition: '',
    brandName: '',
    category: [],
    collectionSlugs: [],
    color: '',
    designer: '',
    details: '',
    gender: [],
    gridPictureUrl: '',
    hasPicture: false,
    hasStock: false,
    id: '',
    keywords: [],
    mainPictureUrl: '',
    midsole: '',
    name: '',
    nickname: '',
    originalPictureUrl: '',
    productTemplateId: 0,
    releaseDate: '',
    releaseDateUnix: 0,
    releaseYear: 0,
    retailPriceCents: 0,
    shoeCondition: '',
    silhouette: '',
    sizeRange: [],
    slug: '',
    sneakerID: 0,
    status: '',
    stockKeepingUnits: '',
    storyHtml: '',
    upperMaterial: ''
  };
  id:number=397517;
  taskSubscription: Subscription = new Subscription;
  constructor(private sneakersApi: SneakersApiService,
    private cartService:CartService, 
    private authService:AuthService,
    private route:ActivatedRoute, 
    private router: Router,
    private toast:NgToastService) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.taskSubscription=this.sneakersApi.getSneakerById(this.id).subscribe((result) => {
      if (result) {
        if(result.releaseDate){
          const date = new Date(result.releaseDate);
          result.releaseDate=date.toDateString();
        }
        result.sizeRange.sort(function(a,b) { return a - b;});
        this.sneaker = result;
      }
    }, error => console.error(error));
  }
  ngOnDestroy(){
    this.taskSubscription.unsubscribe();
  }

  addToCart(){
    if(this.authService.isLoggedIn()){
      this.cartService.addToCart(this.sneaker).subscribe((result) => {
        if (result) {
          this.router.navigate(['cart']);
          this.toast.success({detail:"Success!", summary:result.message, duration:2000});
        }
      }, (error) => {
        this.toast.error({detail:"Error!", summary:error.error.message, duration:2000});
      });
    }else{
      this.router.navigate(['login']);
      this.toast.info({detail:"Information!", summary:"You must be logged in add item in cart!", duration:2000});
    }
  }

}
