import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingeDataService {

  // constructor() { }
  // private data:any = undefined;

  // setData(data:any){
  //     this.data = data;
  // }

  // getData():any{
  //     return this.data;
  // }
  private messageSource = new BehaviorSubject('');
  data = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }
}
