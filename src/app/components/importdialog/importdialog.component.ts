import { Component, HostListener, Inject } from '@angular/core';
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
  tablename:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private importservice: ImportService,private dialogRef: MatDialogRef<any>,private snackBar: MatSnackBar) {
    this.filename = data.filename;
    this.sheetname = data.sheetname;
    this.rowcount = data.rowcount;
    this.tablename=data.tablename;
  }
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event:any) {
    // ...
    alert("bye");
  }
  async start() {
    this.processState=true;
    let i;
    for ( i = 0; i < this.rowcount; i++) {
      this.showprogress = true;
      if(this.processState==false) {
        // alert("import terminated");
        this.snackBar.open("Import terminated").afterDismissed().subscribe(() => {
          
          this.dialogRef.close();
        });
        break;
      }
      let a: any = await lastValueFrom(this.importservice.importRow(this.filename, this.sheetname, i,this.tablename));
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
    if(i==this.rowcount)
    {
      this.processState=false;
      this.snackBar.open("import data successfully","Close").afterDismissed().subscribe(data=>{
        this.dialogRef.close();
      });
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
