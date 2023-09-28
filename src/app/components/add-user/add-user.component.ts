import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  myform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required]),
    role: new FormControl("", [Validators.required]),
    ipaddress: new FormControl("", [Validators.required]),
    macaddress: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    repwd: new FormControl("", [Validators.required]),
    comcode: new FormControl("", [Validators.required]),

    // type: new FormControl('login')
  });
  save() {
    if(this.myform.valid==true) {
        
    }      
  }
}
