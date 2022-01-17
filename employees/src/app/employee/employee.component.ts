import { Component, OnInit } from '@angular/core';
import { Employee } from '.';
import { EmployeesService } from '../employees.service';
import { ActionService } from '../action.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employee : Employee = {
    "_id": "86",
    "first_name": "Lukundu",
    "last_name": "Lako",
    "bio": "I live and sleep coffee...and tea.",
    "avatar": "f9c3b01971f3934e.jpg"
  };
  showModule: boolean = false
  subscription: Subscription
  
  constructor(private employeesService: EmployeesService, private action : ActionService) { 
    this.subscription = this.action
    .onToggle()
    .subscribe((value) => (this.showModule = value));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.employeesService.getEmployee('91').subscribe( employee => this.employee = employee);
  }

  toggleModule() {
    this.action.toggleModule()
  }

}
