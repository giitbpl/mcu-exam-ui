import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { UserService } from 'src/app/services/upload.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public dtOptions: DataTables.Settings = {};
  userlist:any;
  loaddata:any=false;
constructor(private userService: UserService,public dialog: MatDialog)
{
  // this.dtOptions={

  // }
  this.dtOptions = {
    pagingType: 'full_numbers'
  };
    userService.getAllUsers().subscribe((users:any) =>{
      console.log(users);
      
      this.userlist=users.data;
      this.loaddata=true;
    });
}
del(uid:any)
{

}
edit(uid:any)
{

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
}
