import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string | null = null;

  constructor(private storage: Storage) {
    this.init();
   }

   async init(){
    const storage = await this.storage.create();
    this.token = await storage.get('auth-token');
    this.isAuthenticated = !!this.token;
   }

   async login(email: string, password: string): Promise<boolean>{
    if(email === 'test@example.com' && password === 'test'){
      this.token = 'dummy-token';
      this.isAuthenticated = true;
      await this.storage.set('auth-token', this.token);
      return true;
    }
    return false;
   }

   async logout(){
    this.token = null;
    this.isAuthenticated =false;
    await this.storage.remove('auth-token');
   }

   isLoggedIn(): boolean{
    return this.isAuthenticated;
   }

}
