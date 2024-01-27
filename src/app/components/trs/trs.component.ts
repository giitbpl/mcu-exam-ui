import { Component, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { SharingeDataService } from 'src/app/services/sharinge-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trs',
  templateUrl: './trs.component.html',
  styleUrls: ['./trs.component.css']
})
export class TrsComponent implements OnDestroy{
fontSize: number = 12;
zoomout() {
this.fontSize-- ;

}
zoomin() {

this.fontSize++;
}
// zoomout() {

//   document.p.style.zoom = "120%"


// }
// zoomin() {


// }
  studetail:any=[];
  @Input() showdata:boolean = false;
  name: string;
  username:string;
  ipaddress:string;
  email:string;
  agrtotobtn:any;
  agrtotout:any;
  CGPA:any;
  result:any;
  subscription: Subscription;
  constructor(private sharing: SharingeDataService,private snakebar: MatSnackBar,private router: Router, private toastservice: ToastService,private jwt:JwtTokenService,private userservice: UserService) {
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
    this.sharing.changeMessage("");

    this.subscription = this.sharing.data.subscribe((result:any) => {
      // dtInstance.clear();
      console.log("result: " , result.sem);
      let length=result.consolidateddata.length;
      this.agrtotobtn=result.consolidateddata[length-1].agrtotobtn;
      this.agrtotout=result.consolidateddata[length-1].agrtotout;
      this.CGPA=result.consolidateddata[length-1].CGPA;
      this.result=result.consolidateddata[length-1].CGPA;
    
      this.studetail = result;
      this.showdata=true;
      // this.loadData = true;

      // console.log("result=", this.stulist);

    });
  }
  ngOnDestroy(): void {
    // this.stulist = "";
    this.sharing.changeMessage("");
    this.subscription.unsubscribe();
  }
  // ngOnChanges(changes: SimpleChanges) {

  //   this.studetail = changes["studetail"].currentValue;
  //   console.log(this.studetail);
  //   this.name = this.studetail.student[0].name;
  //   this.showdata=true;
  // }

  show() {

    this.toastservice.open("hello world", "success").afterClosed().subscribe(() => {
      // alert("Hello world!");
    });
  }
}
