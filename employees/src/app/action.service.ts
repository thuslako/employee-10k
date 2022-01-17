import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private showModule: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleModule():void {
    this.showModule = !this.showModule;
    this.subject.next(this.showModule);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
