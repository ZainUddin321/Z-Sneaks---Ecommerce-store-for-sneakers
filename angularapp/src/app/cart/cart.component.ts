import { Component} from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Sneakers } from '../Services/sneakers-api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";
import { CartOrderComponent } from '../cart-order/cart-order.component';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: true,
    imports: [
        NgFor,
        MatIconModule,
        RouterLink,
        FormsModule,
        CommonModule,
        CartSummaryComponent,
        CartOrderComponent
    ]
})
export class CartComponent {
  public sneakers:Sneakers[]=[];
  public totalPrice: number=0;
  public coupon:string="";
  public cartPageType: string = "Summary";
  constructor(private cartService:CartService, private toast: NgToastService){}

  ngOnInit(){
    this.cartService.getProductsOfCart().subscribe((result=> {
      if(result){
        this.sneakers = result;
        this.sneakers.forEach((sneaker) =>{
          this.totalPrice += sneaker.retailPriceCents/100;
        });
      }
    }),
    (error => {
      this.toast.error({detail:"Error", summary:"Unable to get cart items!", duration:2000});
    }));
  }

  removeFromCart(sneaker:Sneakers, cartItem:HTMLSpanElement){
    this.cartService.removeFromCart(sneaker).subscribe((result)=>{
      this.totalPrice -= sneaker.retailPriceCents/100;
      cartItem.remove();
      this.toast.success({detail:"Success", summary:result.message, duration:2000});
    }, (error)=>{
      console.log(error);
      this.toast.error({detail:"Error", summary:error.error.message, duration:2000});
    });
  }

  incrementCounter(counter:HTMLSpanElement, price:HTMLSpanElement, sneaker:Sneakers){
    let value = Number(counter.innerText);
    value++;
    this.totalPrice += (sneaker.retailPriceCents/100);
    price.innerText = "$"+(sneaker.retailPriceCents/100)*value;
    let result=(value<10)?"0"+value:value;
    counter.innerText = String(result);

  }

  decrementCounter(counter:HTMLSpanElement, price:HTMLSpanElement, sneaker:Sneakers){
    let value = Number(counter.innerText);
    if(value > 0){
      value--;
      this.totalPrice -= (sneaker.retailPriceCents/100);
      price.innerText = "$"+(sneaker.retailPriceCents/100)*value;
      let result=(value<10)?"0"+value:value;
      counter.innerText = String(result)
    }
  }

  removeItemsFromCart(){
    this.sneakers = [];
  }

  changeCartPageType(type:string){
    this.cartPageType = type;
  }
}
