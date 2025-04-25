import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(private auth: AuthService, private navController: NavController) {}

  logout(){
    this.auth.logout();
    this.navController.navigateForward('/login');
  }
}
