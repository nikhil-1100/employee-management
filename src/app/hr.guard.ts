import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HrGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'hr';
  }
}

