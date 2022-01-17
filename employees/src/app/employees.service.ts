import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,catchError, of } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseUrl = 'http://localhost:3000/employee'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) {
    
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl)
  }

  getEmployee(id: string): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Employee>(url,this.httpOptions)
  }

  updateAvatar(employee : Employee): Observable<Employee> {
    const url = `${this.baseUrl}/${employee._id}/avatar`;
    return this.http.get<Employee>(url,this.httpOptions)
  }

  deleteAvatar(employee : Employee): Observable<Employee> {
    const url = `${this.baseUrl}/${employee._id}/avatar/${employee.avatar}`;
    return this.http.delete<Employee>(url,this.httpOptions)
  }

}
