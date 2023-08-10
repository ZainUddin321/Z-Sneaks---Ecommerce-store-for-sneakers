import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  private login:UrlTree;
  constructor(private auth:AuthService, private router:Router, private toast: NgToastService){
    this.login = this.router.parseUrl('login');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isLoggedIn()){
        let result = false;
        state.url=='/login'?result = false: result=true;
        if(!result){
          this.router.navigate(['']);
        }
        return result;
      }else{
        let result = false;
        state.url=='/login'?result = true:result=false;
        if(!result){
          this.toast.info({detail:"Informaton!", summary:"You must be logged in to access this page!", duration:3000})
          this.router.navigate(['login']);
        }
        return result;
      }
  }
  
}
