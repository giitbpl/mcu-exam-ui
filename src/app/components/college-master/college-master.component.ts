import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImportService } from 'src/app/services/import.service';
import { ToastService } from 'src/app/services/toast.service';
import { ImportdialogComponent } from '../importdialog/importdialog.component';

@Component({
  selector: 'app-college-master',
  templateUrl: './college-master.component.html',
  styleUrls: ['./college-master.component.css']
})
export class CollegeMasterComponent {
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
  public years: any;
  public tables: any;
  constructor(private importService: ImportService, private snackBar: ToastService, private dialog: MatDialog, private route: ActivatedRoute) {
    this.years = Array.from(Array(new Date().getFullYear() - 2011), (_, i) => (i + 2012).toString())
    // console.log("years=>", years)
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
          // this.loadSheet(this.filelist[0]);
        }
        else {
          this.filelistflag = false;
          this.sheetlistflag = false;
        }
      }
    });
    importService.getAllTables().subscribe((data: any) => {
      console.log("table name=>", data);
      // if(data.error=="false") {
      this.tables = data.data;
      //  }
      //  else
      //  {
      // location.href="/";
      //  }
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  process() {
    console.log(this.file.type);
    if (this.file == undefined) {
      this.snackBar.open('please select excel file first', "error");

    }
    // else if (this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    //   this.snackBar.open('this file is not a excel file', "error");

    // }
    // else if (this.file.type != "application/vnd.ms-excel") {
    //   this.snackBar.open('this file is not a excel file', "error");

    // }
    else {

      this.importService.upload(this.file).subscribe((data: any) => {
        console.log(data);
        if (data.error == "false") {
          let snackref = this.snackBar.open('File upload successfully');
          snackref.afterClosed().subscribe(() => location.reload());


        }
        else {
          this.snackBar.open('File upload failed', "error");

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
        this.sheetlistflag = true;
      }
      else
        this.snackBar.open('no sheet found in this file', "error");
      this.sheetlistflag = false;


    });

  }
  sheetrowcount(sheetname: string, filename: string) {
    this.importService.getSheetRecord(sheetname, filename).subscribe((response: any) => {
      console.log(response);
      this.rowcount = response.data;
    });
  }
  import(filename: any, sheetname: any, tablename: any) {
    // this.importService.
    let sendata = {
      "sheetname": sheetname,
      "filename": filename,
      "rowcount": this.rowcount,
      "tablename": tablename,
      "type": "college"
    };
    this.dialog.open(ImportdialogComponent, {
      width: "800px",
      data: sendata,
      hasBackdrop: false
    });
  }
  verify(filename: any, sheetname: any) {
    this.importService.verify(filename, sheetname,"college").subscribe((response: any) => {
      console.log(response);
      if (response.error == "false") {
        this.sheetvarify = true;
        this.snackBar.open(response.message);
      }
      else {
        this.sheetvarify = false;
        this.snackBar.open(response.message, "error");
      }

    });
  }
  create(session: any, year: any) {
    this.importService.createTable(session, year).subscribe((response: any) => {
      console.log(response);
      if (response.error == "true") {
        this.snackBar.open(response.message, "error");
      }
      else {
        this.snackBar.open(response.message, "success");

      }
    });

  }
}
