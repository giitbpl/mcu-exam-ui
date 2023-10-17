import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import * as CryptoJS from 'crypto-js';
import { UtilityService } from 'src/app/services/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  // pwd= new FormControl('', [Validators.required]);
  // repwd= new FormControl('', [Validators.required]);
  // passwordPattern= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  // passwordPattern= /(?=.?[A-Z]) (?=.?[a-z]) (?=.?[0-9]) (?=.?[#?!@$%^&*-]) .{8,20}/;
constructor(private formBuilder: FormBuilder,
  private userservice: UserService,
  private utilityService: UtilityService,
  private snakebar:MatSnackBar)
{

}
  myform = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    // pwd: new FormControl('', [Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$"),Validators.minLength(8),Validators.maxLength(20)]),
    pwd: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
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
    // this.myform.controls['name'].setErrors({required: true});
    if(this.myform.valid==true) {
      // this.myform.controls["pwd"].clearValidators();
      // this.myform.patchValue({
      //   pwd: CryptoJS.SHA256(this.myform.controls["pwd"].value).toString(),

      // });
      console.log(this.myform.value);
      this.utilityService.enableForm(this.myform,false);
      this.userservice.registerUser(this.myform.value).subscribe((data:any) => {
        console.log(data);
        if (data.error=="false")
        {
              this.snakebar.open(data.message).afterDismissed().subscribe(data => {
                window.location.reload();
              });
        }
        else
        {
          this.snakebar.open(data.message);
        }
        
      });
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


