import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  doughnutChart: any = [];
  barChart: any = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'date',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  totalLeavesToday: number = 0
  totalEmployees: number = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _empService: EmployeeService,
    private _leaveService: LeaveService
  ) {
  }

  ngOnInit(): void {
    this.getPendingLeaveList();
    this.getLeaveListForToday();
    this.getEmployeesCount();
  }

  addCharts() {
    this.doughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['Leaves today', 'Other Employees'],
        datasets: [
          {
            label: 'Count',
            data: [this.totalLeavesToday, this.totalEmployees - this.totalLeavesToday],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Leaves today', 'Other Employees'],
        datasets: [
          {
            label: 'Count',
            data: [this.totalLeavesToday, this.totalEmployees - this.totalLeavesToday],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getPendingLeaveList() {
    this._leaveService.getPendingLeaveList().subscribe({
      next: (res) => {
        res.forEach((leaveItem: any) => {
          this._empService.getEmployeeDetail(leaveItem.employee_id).subscribe({
            next: (employee: any) => {
              leaveItem['firstName'] = employee.firstName
              leaveItem['lastName'] = employee.lastName
              leaveItem['email'] = employee.email
            }
          });
        })

        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  approveLeave(data: any) {
    this._leaveService.approveLeave(data.id, data).subscribe({
      next: (res) => {
        alert("Approved!")
        this.getPendingLeaveList()
      },
      error: console.log
    })
  }

  getLeaveListForToday() {
    const today = new Date().toISOString().split('T')[0];

    this._leaveService.getTodaysLeaveList(today).subscribe({
      next: (res) => {
        console.log("sf", res)
        this.totalLeavesToday = res.length;
      },
      error: console.log
    })
  }

  getEmployeesCount() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.totalEmployees = res.length
        this.addCharts();
      },
      error: console.log
    })
  }
}
