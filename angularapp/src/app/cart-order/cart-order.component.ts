import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgForm, FormsModule } from '@angular/forms';
import { CartService } from '../Services/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css'],
  standalone:true,
  imports:[
    FormsModule,
    MatIconModule
  ]
})
export class CartOrderComponent {
  @Input() totalPrice: number=0;
  @Input() noOfItems: number=0;
  @Output() changeCartPageEvent = new EventEmitter();
  @Output() removeItemsFromCartEvent = new EventEmitter();

  @ViewChild('form') form!: NgForm;
  constructor(private cartService:CartService,private toast: NgToastService){}
  changeCartPage(){
    this.changeCartPageEvent.emit("Summary");
  }

  removeItemsFromCart(){
    this.removeItemsFromCartEvent.emit();
  }

  onFormSubmit(){
    this.cartService.removeItemsFromUserCart().subscribe((result)=>{
      this.toast.success({detail:"Success", summary:"Your order has been placed successfully!", duration:2000});
      this.removeItemsFromCart();
      this.changeCartPage();
    },(error)=>{
      this.toast.error({detail:"Error", summary:"You have no product in your card!", duration:2000});
    });
  }
}
