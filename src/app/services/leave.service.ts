import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  constructor(private _http: HttpClient) {}

  getPendingLeaveList(): Observable<any> {
    return this._http.get('http://localhost:3000/leaves?approved=false');
  }

  getTodaysLeaveList(date: string): Observable<any> {
    return this._http.get(`http://localhost:3000/leaves?approved=true&date=${date}`);
    
  }
  addLeave(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/leaves', data);
  }
  approveLeave(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/leaves/${id}`, {
      id: id,
      employee_id: data.employee_id,
      date: data.date,
      approved: true
    });
  }
  getMyLeaveList(employee_id:number): Observable<any> {
    return this._http.get(`http://localhost:3000/leaves?employee_id=${employee_id}`);  
  }

}

