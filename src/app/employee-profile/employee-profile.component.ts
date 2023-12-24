import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent {
  user: any = {}
  
  constructor(
    private _authService: AuthService
  ){}
  
  ngOnInit(): void {
    this.getActiveUser(); 
  }

  getActiveUser() {
    this.user = this._authService.getActiveUser();
  }
}
