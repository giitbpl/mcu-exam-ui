import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
// import sha256 from 'angular-crypto';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {
  passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  private formdata = [];
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
  constructor(private formBuilder: FormBuilder, private userservice: UserService, private toastservice: ToastService) {

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
    console.log(this.myform.value);
    if (this.myform.valid == true) {
      // this.myform.controls["pwd"].clearValidators();
      // this.myform.controls["oldpwd"].clearValidators();
      // // this.myform.controls["repwd"].disable;
      // this.myform.patchValue({
      //   oldpwd: CryptoJS.SHA256(this.myform.controls["pwd"].value).toString(),
      //   pwd: CryptoJS.SHA256(this.myform.controls["oldpwd"].value).toString(),
      //   repwd:""
      // });

      // this.myform.clearValidators();
      // this.myform.clearValidators();
      // this.myform.patchValue({
      // this.newpwd = CryptoJS.SHA256(this.myform.controls["pwd"].value).toString();
      // this.oldpwd = CryptoJS.SHA256(this.myform.controls["oldpwd"].value).toString();

      this.userservice.changePwd(this.myform.value).subscribe((data: any) => {
        // console.log(data);
        this.toastservice.open(data.message).afterClosed().subscribe(data => {
          location.reload();
        });
      });



    }


  }
}
