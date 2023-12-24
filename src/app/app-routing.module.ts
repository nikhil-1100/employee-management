import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeLeaveApplicationComponent } from './employee-leave-application/employee-leave-application.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HrGuard } from './hr.guard';
import { EmployeeGuard } from './employee.guard';


const routes: Routes = [
  {path: 'hr/dashboard', component: DashboardComponent, canActivate: [HrGuard]},
  {path: 'hr/employee-details', component: EmployeeListComponent, canActivate: [HrGuard]},
  
  {path: 'employee/profile', component: EmployeeProfileComponent, canActivate: [EmployeeGuard]},
  {path: 'employee/leave-application', component: EmployeeLeaveApplicationComponent, canActivate: [EmployeeGuard]},
  {path: '', component: LoginComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
