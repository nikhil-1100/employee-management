import { Component } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-employee-leave-application',
  templateUrl: './employee-leave-application.component.html',
  styleUrls: ['./employee-leave-application.component.scss']
})
export class EmployeeLeaveApplicationComponent {
date: any;
displayedColumns: string[] = [
  'id',
  'date',
  'approved'
  
];
dataSource!: MatTableDataSource<any>;
constructor(
  private _empService: EmployeeService,
  private _leaveService: LeaveService,
  private _authService: AuthService,
) {
}
ngOnInit(): void {
  this.getMyleave();
}
applyLeave(){
  const data = {
    employee_id: this._authService.getActiveUser()?.id,
    date: new Date(this.date).toISOString().split('T')[0],
    approved: false
  }
  this._leaveService.addLeave(data).subscribe({
    next: (val) => {
      console.log(val);
      this.getMyleave();
      alert("Leave Applied");
    },
    error: console.log
  })
}
getMyleave(){
  this._leaveService.getMyLeaveList(this._authService.getActiveUser()?.id).subscribe({
    next: (val) => {
      this.dataSource = new MatTableDataSource(val);
    },
    error: console.log
  })
}

}


