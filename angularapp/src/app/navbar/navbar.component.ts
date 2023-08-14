import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { UserStoreService } from '../Services/user-store.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [RouterLink, NgIf]
})
export class NavbarComponent {
  public fullName:string = "";
  constructor(private authService: AuthService, private userStore: UserStoreService,private toast:NgToastService, private router:Router){}

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
    this.toast.success({detail:"Success!", summary:"You're logged out successfully!", duration:2000});
    this.authService.signOut();
  }

  openShoeCollection(id: string){
    if(this.router.url == "/sneakers"){
      const element = document.getElementById(id);
      var headerOffset = 50;
      
      if(element){
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }else{
      this.router.navigate(["sneakers"]);
      setTimeout(()=>{
        const element = document.getElementById(id);
        var headerOffset = 50;
        if(element){
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      },1500)
      
    }
  }
}
