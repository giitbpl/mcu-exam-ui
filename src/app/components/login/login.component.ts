import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { LoginService } from 'src/app/services/login.service';
import * as CryptoJS from 'crypto-js';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required]),
    // type: new FormControl('login')
  });
  constructor(private utilityservice: UtilityService, private loginservice: LoginService, private router: Router, private snackBar: MatSnackBar, private jwt: JwtTokenService) {

  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  process() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid == true) {
      // this.loginForm.patchValue({
      //   pwd: CryptoJS.SHA256(this.loginForm.controls.pwd.value!).toString(),
      // });
      console.log("form data=", this.loginForm.value);
      
      this.utilityservice.enableForm(this.loginForm, false);
      this.loginservice.login(this.loginForm.value).subscribe((data: any) => {
        console.log(data);
        if (data.error == "false") {
          this.jwt.saveToken(data.token);
          // sessionStorage.setItem("",
          this.router.navigate(['/dashboard']);
        }
        else if (data.error == "true") {
          this.utilityservice.enableForm(this.loginForm, true);
          this.snackBar.open(data.message, "close");
        }
        else {
          this.utilityservice.enableForm(this.loginForm, true);
          this.snackBar.open('database error', "close");

        }
      });
    }
    else {
      this.snackBar.open('please check the form values', "close");

    }
  }
}
