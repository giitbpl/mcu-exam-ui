import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  enableForm(group: FormGroup, enable:boolean) {
    for (const i in group.controls) {
       if(enable) {
         group.controls[i].enable();
       } else {
         group.controls[i].disable();
       }
    }
 }
}
