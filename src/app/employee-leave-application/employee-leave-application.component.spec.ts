import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveApplicationComponent } from './employee-leave-application.component';

describe('EmployeeLeaveApplicationComponent', () => {
  let component: EmployeeLeaveApplicationComponent;
  let fixture: ComponentFixture<EmployeeLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
