import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email:string ='';
  password: string ='';
  errorMsg: string ='';

  constructor(private auth: AuthService, private router: Router) { }

  async login(){
    if(this.email.trim().length === 0 && this.password.trim().length ===0){
      this.errorMsg = 'Please provide login credentials';
    }
    else if(this.email.trim().length === 0){
      this.errorMsg = 'Please enter an email address';
    }
    else if(this.password.trim().length === 0){
      this.errorMsg = 'Please enter a password';
    }
    else{
      try{
        const resp = await this.auth.login(this.email, this.password);
        if(resp == true){
          this.router.navigate(['/tabs/tab1'], {replaceUrl: true});
        }
        else{
          this.errorMsg = 'Invalid login credentials';
        }
      }
      catch(error){
        console.error('Login error: ', error);
        this.errorMsg = 'An error occurred while trying to log you in. Please try again later';
      }
    }
  }

}
