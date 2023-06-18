import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload:any;
  constructor(private http:HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
   }

  signUp(userObj:any){
    return this.http.post<any>(`/api/Authenticate/register`,userObj)
  }

  signIn(userObj:any){
    return this.http.post<any>(`/api/Authenticate/login`,userObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  checkUserExists(userName:string){
    return this.http.get<any>('/api/Authenticate/checkUserExist/' + userName)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  storeToken(token: string){
    return localStorage.setItem('token', token)
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getUserNameFromToken(){
    if(this.userPayload)
    return this.userPayload.username;
  }
}
