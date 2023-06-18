import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../Services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeSection:string = "Login";
  userData:userInterface = {
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    password:'',
    confirmpassword:'',
  }
  @ViewChild('loginBtn') loginBtn!: ElementRef;
  @ViewChild('signupBtn') signUpBtn!: ElementRef;
  @ViewChild('form') form!: NgForm;
  userNameErrorMessage:string = "";
  invalidUsernameOrPassword:string = "";
  constructor(private authService: AuthService, private router:Router, private userStore: UserStoreService){  }
  changeSection(sectionName:string){
    this.form.resetForm();
    if(sectionName == "Login"){
      this.activeSection="Login";
    }
    else if(sectionName="SignUp"){
      this.activeSection="SignUp";
    }
  }

  onUsernameFieldFocusOut(){
    if(this.activeSection == "SignUp"){
      this.authService.checkUserExists(this.userData.userName)
      .subscribe((result)=>{
        this.userNameErrorMessage="";
      },
      (error)=>{
        if(error && error.error.message){
          this.userNameErrorMessage = error.error.message;
        }
      });
    }
  }

  onFormSubmit(){
    let formData = this.form.form;
    if(formData && formData.status == "VALID"){
      if(this.activeSection=="Login"){
        this.authService.signIn(this.userData).subscribe((result) => {
          if (result) {
            this.form.resetForm();
            this.invalidUsernameOrPassword = "";
            this.authService.storeToken(result.token);
            const tokenPayload = this.authService.decodeToken();
            this.userStore.setFullNameForStore(tokenPayload.unique_name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.userStore.setUserNameForStore(tokenPayload.username);
            this.router.navigate(['']);
          }
        }, (error) => {
          if(error && error.error && error.error.message){
            this.invalidUsernameOrPassword= error.error.message;          
          }
        });
      }else if(this.activeSection == "SignUp"){
        this.authService.signUp(this.userData).subscribe((result) => {
          if (result) {
            this.form.resetForm();
            this.activeSection = "Login";
            this.router.navigate(['login']);
            console.log(result);
          }
        }, error => console.error(error));
      }
    }
  }
}

interface userInterface {
  firstName:string,
  lastName:string,
  userName:string,
  email:string,
  password:string,
  confirmpassword:string
}
