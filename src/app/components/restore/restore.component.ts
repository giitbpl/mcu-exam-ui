import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestoreService } from 'src/app/services/restore.service';
// import { RestoreService } from 'src/app/services/restore.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})
export class RestoreComponent {
  file: any;
  constructor(private snackBar:MatSnackBar,private restoreSservices:RestoreService)
  {

  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  process()
  {
    console.log(this.file);
    
    if (this.file == undefined) {
      this.snackBar.open('please select sql file first', "close");

    }
    // else if (this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    //   this.snackBar.open('this file is not a excel file', "close");

    // }
    else {
      RestoreService
      this.restoreSservices.upload(this.file).subscribe((data: any) => {
        console.log(data);
        if (data.error == "false") {
          let snackref = this.snackBar.open('File upload successfully', "close");
          snackref.afterDismissed().subscribe(() => location.reload());


        }
        else {
          this.snackBar.open('File upload failed', "close");

        }
      });
    }
  }
}
