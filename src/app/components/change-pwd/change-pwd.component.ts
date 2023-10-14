import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
// import sha256 from 'angular-crypto';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {
  passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  private formdata=[];
  private oldpwd: any = "";
  private newpwd: any = "";
  myform = this.formBuilder.group({

    oldpwd: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.passwordPattern)]),

    pwd: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.passwordPattern)]),
    repwd: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),

  },
    {
      validators: this.ConfirmedValidator("pwd", "repwd"),
    }
  );
  constructor(private formBuilder: FormBuilder, private userservice: UserService) {

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
  save() {
    if (this.myform.valid == true) {
      // this.formdata.
      this.oldpwd = CryptoJS.SHA256(this.myform.controls["oldpwd"].value);
      this.newpwd = CryptoJS.SHA256(this.myform.controls["newpwd"].value);
      
    }


  }
}
