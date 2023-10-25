import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as saveAs from 'file-saver';
import { ImportService } from 'src/app/services/import.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent {
  tables:any;
  constructor(private importService: ImportService, private toastservice: ToastService, private dialog: MatDialog) 
    {
      importService.getAllTables().subscribe((data:any) =>{
        // console.log("table name=>",data);
        this.tables=data.data;
      });
    }
  backup(tablename:any) {
    this.importService.backup(tablename).subscribe((result: any) => {
      // console.log(result);
      let file = window.URL.createObjectURL(result);
      // let downloadURL = window.URL.createObjectURL(data);
      // let filename=new Date().toLocaleDateString('hi')

      saveAs(result,""+"MCU-"+tablename+".sql");
    });


  }
}
