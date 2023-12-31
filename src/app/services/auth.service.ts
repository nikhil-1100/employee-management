import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get(`http://localhost:3000/employees?email=${email}&password=${password}`);
  }

  getActiveUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
