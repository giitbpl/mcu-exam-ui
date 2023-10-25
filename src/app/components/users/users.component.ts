import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { UserService } from 'src/app/services/upload.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public dtOptions: DataTables.Settings = {};
  userlist:any;
  loaddata:any=false;
constructor(private userService: UserService,public dialog: MatDialog,private snakebar: ToastService,private route:Router)
{
  // this.dtOptions={

  // }
  this.dtOptions = {
    pagingType: 'full_numbers'
  };
    userService.getAllUsers().subscribe((users:any) =>{
      console.log(users);
      if(users.error=="true" && users.code==1001)
      {
          snakebar.open(users.message,"error").afterClosed().subscribe(() =>{
            route.navigate(["/"]);
          });
      }
      else
      {
        this.userlist=users.data;
        this.loaddata=true;
      }
    
    });
}
del(uid:any)
{

}
edit(uid:any)
{
  this.userService.getUserByUid(uid).subscribe((data:any) =>{
    console.log(data);
    const dialogRef = this.dialog.open(AddUserComponent,{
      disableClose: true,
      width: '800px',
      height:"auto",
      data:data,
      position: {
        top: "10px"
      },
      // height: '100%',
      hasBackdrop: false,
  
    });
  });
 
}
add()
{
 
    const dialogRef = this.dialog.open(AddUserComponent,{
      disableClose: true,
      width: '800px',
      height:"auto",
      position: {
        top: "10px"
      },
      // height: '100%',
      hasBackdrop: false,

    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  
}
changeStatus(uid:any)
{
  let ans=confirm('Are you sure you want to change the status ');
  if(ans==true)
  {
      this.userService.changeUserstatus(uid).subscribe((result:any) => {
        console.log(result);
        
        if(result.error=="false")
        {
            this.snakebar.open(result.message).afterClosed().subscribe(()=>{
              location.reload();

            });
        }
        
      });
  }
  // console.log(ans);
  
}
}
