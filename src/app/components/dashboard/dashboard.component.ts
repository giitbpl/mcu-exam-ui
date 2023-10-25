import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { UserService } from 'src/app/services/user.service';
import { ChangePwdComponent } from '../change-pwd/change-pwd.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';
// import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {
  showFiller = false;
  userRole: any;
  username: string;
  constructor(private toastservice:ToastService, private jwt: JwtTokenService,private loginservice:LoginService, private userservice: UserService, private router: Router, private dialog: MatDialog) {
    let token = jwt.getToken();
    userservice.getUserDetailByToken(token).subscribe((result: any) => {
      console.log(result);
      
      if(result.error=="true")
      {
          toastservice.open(result.message,"error").afterClosed().subscribe(()=>{
            
            router.navigate(['/']);
          });
      }
      else
      {
        console.log(result);
        this.userRole = result.data.role;
        this.username=result.data.name;
      }
    })

  }
  logout() {
    this.loginservice.logout().subscribe((response:any) => {

      this.jwt.deleteToken();
      this.router.navigate(["/"]);
    });

  }
  chpwd() {
    // let dilogref=this.dialog.open(ChangePwdComponent,{
    //   hasBackdrop:false,
    //   // closeOnNavigation:false,
    //   // clos
    // });
  }
}
