import { Injectable } from '@angular/core';
import { Sneakers } from './sneakers-api.service';
import { UserStoreService } from './user-store.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public userName:string = "";
  constructor(private http:HttpClient, private router: Router, private userStore: UserStoreService, private authService: AuthService) { 
    this.userStore.getUserNameFromStore()
    .subscribe(val=>{

      let fullNameFromToken =this.authService.getUserNameFromToken();
      this.userName = val || fullNameFromToken
    });
  }

  getProductsOfCart(){
    return this.http.get<Sneakers[]>(`/api/Cart/getProductsOfCart/${this.userName}`);
  }

  addToCart(sneaker:Sneakers){
    return this.http.post<any>(`/api/Cart/addToCart/${this.userName}`, sneaker);
  }

  removeFromCart(sneaker:Sneakers){
    return this.http.post<any>(`/api/Cart/removeFromCart/${this.userName}`, sneaker);
  }
}
