import { Component, ElementRef } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Sneakers } from '../Services/sneakers-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  public sneakers:Sneakers[]=[];
  public totalPrice: number=0;
  public coupon:string="";
  constructor(private cartService:CartService){}

  ngOnInit(){
    this.cartService.getProductsOfCart().subscribe((result=> {
      if(result){
        this.sneakers = result;
        this.sneakers.forEach((sneaker) =>{
          this.totalPrice += sneaker.retailPriceCents/100;
        });
      }
    }),
    (error => console.log(error)));
  }

  removeFromCart(sneaker:Sneakers, cartItem:HTMLSpanElement){
    this.cartService.removeFromCart(sneaker).subscribe((result)=>{
      this.totalPrice -= sneaker.retailPriceCents/100;
      cartItem.remove();
      console.log(result);
    }, (error)=>console.log(error));
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

}
