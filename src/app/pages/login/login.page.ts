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
  isSignup: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  async loginOrSignup() {
  
    if (this.email.trim().length === 0 && this.password.trim().length === 0) {
      this.errorMsg = 'Please provide login credentials';
      return;
    } 
    else if (this.email.trim().length === 0) {
      this.errorMsg = 'Please enter an email address';
      return;
    } 
    else if (this.password.trim().length === 0) {
      this.errorMsg = 'Please enter a password';
      return;
    }
  
    try {
      if (this.isSignup) {
        const result = await this.auth.signup(this.email, this.password);
        if (result) {
          this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
        }
      } 
      else {
        const result = await this.auth.login(this.email, this.password);
        if (result) {
          this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
        } 
        else {
          this.errorMsg = 'Invalid login credentials';
        }
      }
    } 
    catch (err) {
      console.error('Auth error:', err);
      this.errorMsg = this.isSignup ? 'Sign up failed.' : 'Login failed. Please try again.';
    }
  }
  
  toggleMode(){
    this.isSignup = !this.isSignup;
    this.errorMsg = '';
  }

}
