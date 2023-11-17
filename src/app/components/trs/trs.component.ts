import { Component, Input, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trs',
  templateUrl: './trs.component.html',
  styleUrls: ['./trs.component.css']
})
export class TrsComponent {
  @Input() studetail:any=[];
  @Input() showdata:boolean = false;
  name: string;
  username:string;
  ipaddress:string;
  email:string;
  constructor(private snakebar: MatSnackBar,private router: Router, private toastservice: ToastService,private jwt:JwtTokenService,private userservice: UserService) {
    console.log("studedetail=>", this.studetail);
    let token = jwt.getToken();
    userservice.getUserDetailByToken(token).subscribe((result: any) => {
      console.log("user detail=>",result);
      if(result.error=="true")
      {
          toastservice.open(result.message,"error").afterClosed().subscribe(()=>{
            
            router.navigate(['/']);
          });
      }
      else
      {
        console.log(result);
        this.ipaddress = result.data.ipaddress;
        this.username=result.data.name;
        this.email=result.data.email;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {

    this.studetail = changes["studetail"].currentValue;
    console.log(this.studetail);
    this.name = this.studetail.student[0].name;
    this.showdata=true;
  }

  show() {

    this.toastservice.open("hello world", "success").afterClosed().subscribe(() => {
      // alert("Hello world!");
    });
  }
}
