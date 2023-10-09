import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {
  myform = this.formBuilder.group({
  
    oldpwd: new FormControl("", [Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
 
    pwd: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
    repwd: new FormControl("", [Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
  
  },
  {
    validators: this.ConfirmedValidator("pwd","repwd"),
  }
  );
  constructor(private formBuilder: FormBuilder,private userservice: UserService)
{

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
save()
{

}
}
