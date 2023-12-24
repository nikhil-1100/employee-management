import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: any = {};

  constructor(
    private _authService: AuthService
  ){}
  
  ngOnInit(): void {
    
  }

  getActiveUser() {
    this.user = this._authService.getActiveUser();
  }

  doLogout() {
    this._authService.logout();
    window.location.replace('/');
  }
}
