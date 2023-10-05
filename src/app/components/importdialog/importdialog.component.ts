import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { ImportService } from 'src/app/services/import.service';

@Component({
  selector: 'app-importdialog',
  templateUrl: './importdialog.component.html',
  styleUrls: ['./importdialog.component.css']
})
export class ImportdialogComponent {
  filename: string = "";
  sheetname: string = "";
  rowcount: number = 0;
  value: number = 0;
  showprogress: boolean = false;
  processState:any = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private importservice: ImportService,private dialogRef: MatDialogRef<any>,private snackBar: MatSnackBar) {
    this.filename = data.filename;
    this.sheetname = data.sheetname;
    this.rowcount = data.rowcount;
  }
  async start() {
    this.processState=true;
    for (let i = 0; i < this.rowcount; i++) {
      this.showprogress = true;
      if(this.processState==false) {
        // alert("import terminated");
        this.snackBar.open("Import terminated");
        this.dialogRef.close();
        break;
      }
      let a: any = await lastValueFrom(this.importservice.importRow(this.filename, this.sheetname, i));
      if (a.error == "false") {
        this.value = (i + 1);

      }
      else if(a.error == "true") {
        alert(a.message);
        this.processState=false;
          break;
      }



      // this.processResult(i);
      console.log(a);
    }
  }
  stop()
{
  this.processState=false;
}

  processResult(i: number) {
    this.value = i;
  }

}
