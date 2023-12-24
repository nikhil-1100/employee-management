import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: user => {
        if (user.length > 0) {
          localStorage.setItem('user', JSON.stringify(user[0]));
          if (user[0].role === 'hr') {
            this.router.navigate(['/hr/dashboard']);
          } else if (user[0].role === 'employee') {
            this.router.navigate(['/employee/profile']);
          }
        } else {
          alert('Invalid credentials');
        }
      },
      error: () => {
        alert('Invalid credentials')
      }
    })
  }
}