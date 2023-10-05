import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  // pwd= new FormControl('', [Validators.required]);
  // repwd= new FormControl('', [Validators.required]);
constructor(private formBuilder: FormBuilder)
{

}
  myform = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required]),
    role: new FormControl("", [Validators.required]),
    ipaddress: new FormControl("", [Validators.required,Validators.pattern("(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])")]),
    macaddress: new FormControl("", [Validators.required,Validators.pattern("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$")]),
    name: new FormControl("", [Validators.required]),
    repwd: new FormControl("", [Validators.required]),
    comcode: new FormControl("", [Validators.required]),

    // type: new FormControl('login')
  },
  {
    validators: this.ConfirmedValidator("pwd","repwd"),
  }
  );
  save() {
    if(this.myform.valid==true) {
        
    }      
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}


