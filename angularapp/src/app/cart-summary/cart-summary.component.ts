import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
  standalone: true,
})
export class CartSummaryComponent {
  @Input() totalPrice: number=0;
  @Input() noOfItems: number=0;
  @Output() changeCartPageEvent = new EventEmitter();
  changeCartPage(){
    this.changeCartPageEvent.emit("Order");
  }
}
