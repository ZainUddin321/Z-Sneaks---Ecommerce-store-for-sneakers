import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { UserStoreService } from '../Services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public fullName:string = "";
  constructor(private authService: AuthService, private userStore: UserStoreService){}

  ngOnInit(){
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{

      let fullNameFromToken =this.authService.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
  }

  get isUserLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }

  signOut(){
    this.authService.signOut();
  }
}
