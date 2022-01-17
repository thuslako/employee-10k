import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';
import { Employee } from '../employee';
import { Subscription } from 'rxjs';
import { ActionService } from '../action.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input()  employee: Employee = {
    "_id": "",
    "first_name": "",
    "last_name": "",
    "bio": "",
    "avatar": ""
  }

  @Output() updateAvatar: EventEmitter<Employee> = new EventEmitter();
  @Output() deleteAvatar: EventEmitter<Employee> = new EventEmitter();

  file: String = ""
  showModule : boolean = false
  subscription : Subscription

  constructor( private action: ActionService) { 
    this.subscription = this.action
    .onToggle()
    .subscribe((value) => (this.showModule = value));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

  }

  onSubmit() {
    const newUpdate: Employee = {
      _id: this.employee._id,
      file: this.file
    } 
    this.updateAvatar.emit(newUpdate)
  }

  onDelete() {
    const newUpdate: Employee = {
      _id: this.employee._id,
      avatar: this.employee.avatar
    } 
    this.deleteAvatar.emit(newUpdate)
  }

}
