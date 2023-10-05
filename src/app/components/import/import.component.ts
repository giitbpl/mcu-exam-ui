import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportService } from 'src/app/services/import.service';
import { ImportdialogComponent } from '../importdialog/importdialog.component';
import { saveAs } from "file-saver"

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  public myform = new FormGroup({
    fileselectlist: new FormControl()
  });
  public dirname: string = "";
  file: any; // Variable to store file
  filelist: any; // Variable to store filename
  sheetlist: any;
  filelistflag = false;
  sheetlistflag = false;
  sheetvarify = false;
  public rowcount: number = 0;
  constructor(private importService: ImportService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    importService.getExportDirectoryName().subscribe((response: any) => {
      console.log("directory name=", response);

      this.dirname = response.data;
    })
    importService.getAllFileNames().subscribe((response: any) => {
      console.log("response=", response);
      if (response.error == "false") {
        if (response.data.length > 0) {
          this.filelistflag = true;
          this.sheetlistflag = true;
          this.filelist = response.data;
          this.loadSheet(this.filelist[0]);
        }
        else {
          this.filelistflag = false;
          this.sheetlistflag = false;
        }
      }
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  process() {
    // console.log(this.file.type);
    if (this.file == undefined) {
      this.snackBar.open('please select excel file first', "close");

    }
    else if (this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      this.snackBar.open('this file is not a excel file', "close");

    }
    else {

      this.importService.upload(this.file).subscribe((data: any) => {
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
  loadSheet(fname: any) {
    this.sheetvarify = false;
    console.log(fname);
    this.importService.getSheetname(fname).subscribe((sheets: any) => {
      console.log("sheetname=", sheets);
      if (sheets.data.length > 0) {
        this.sheetlist = sheets.data;
        this.sheetrowcount(sheets.data[0], fname)
      }
      else
        this.snackBar.open('no sheet found in this file', "close");


    });

  }
  sheetrowcount(sheetname: string, filename: string) {
    this.importService.getSheetRecord(sheetname, filename).subscribe((response: any) => {
      console.log(response);
      this.rowcount = response.data;
    });
  }
  import(filename: any, sheetname: any) {
    // this.importService.
    let sendata = {
      "sheetname": sheetname,
      "filename": filename,
      "rowcount": this.rowcount
    };
    this.dialog.open(ImportdialogComponent, {
      width: "800px",
      data: sendata,
      hasBackdrop: false
    });
  }
  verify(filename: any, sheetname: any) {
    this.importService.verify(filename, sheetname).subscribe((response: any) => {
      console.log(response);
      if (response.error == "false") {
        this.sheetvarify = true;
        this.snackBar.open(response.message, "close");
      }
      else {
        this.sheetvarify = false;
        this.snackBar.open(response.message, "close");
      }

    });
  }
  backup() {
    this.importService.backup().subscribe((result: any) => {
      console.log(result);
      let file = window.URL.createObjectURL(result);
      // let downloadURL = window.URL.createObjectURL(data);
      let filename=new Date().toLocaleDateString('hi')

      saveAs(result,""+"MCU-"+filename+".sql");
    });


  }
}
