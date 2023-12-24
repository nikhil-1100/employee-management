import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'employee';
  }
}
