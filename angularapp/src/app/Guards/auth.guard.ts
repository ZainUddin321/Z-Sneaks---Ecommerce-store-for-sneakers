import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private login:UrlTree;
  constructor(private auth:AuthService, private router:Router){
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
          this.router.navigate(['login']);
        }
        return result;
      }
  }
  
}
