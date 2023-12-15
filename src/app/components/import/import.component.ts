import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportService } from 'src/app/services/import.service';
import { ImportdialogComponent } from '../importdialog/importdialog.component';
import { saveAs } from "file-saver"
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { CourseService } from 'src/app/services/course.service';

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
  courselist: any;

  public rowcount: number = 0;
  public years: any;
  public tables: any;
  constructor(private courseserice: CourseService,private importService: ImportService, private snackBar: ToastService, private dialog: MatDialog,private route: ActivatedRoute) {
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
    importService.getAllTables().subscribe((data:any) =>{
      console.log("table name=>",data);
     // if(data.error=="false") {
      this.tables=data.data;
    //  }
    //  else
    //  {
        // location.href="/";
    //  }
    });
    courseserice.getAllCourse().subscribe((data: any) => {
      console.log(data);
      
      this.courselist = data.data;
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  process() {
    // console.log(this.file.type);
    if (this.file == undefined) {
      this.snackBar.open('please select excel file first', "error");

    }
    else if (this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      this.snackBar.open('this file is not a excel file', "error");

    }
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
      console.log("sheetname=", sheets.length);
      if (sheets.data.length > 0) {
        this.sheetlist = sheets.data;
      //  this.sheetrowcount(sheets.data[0], fname)
        this.sheetlistflag=true;
      }
      else
        this.snackBar.open('no sheet found in this file', "error");
        this.sheetlistflag=false;


    });

  }
  sheetrowcount(sheetname: string, filename: string) {
    this.importService.getSheetRecord(sheetname, filename).subscribe((response: any) => {
      console.log("rowcount=>",response);
      this.rowcount = response.data;
    });
  }
  import(filename: any, sheetname: any,tablename:any) {
    // this.importService.
    console.log(filename, sheetname,tablename,this.rowcount);
    
    let sendata = {
      "sheetname": sheetname,
      "filename": filename,
      "rowcount": this.rowcount,
      // "rowcount": 299472,
      "tablename": tablename,
      "type": "examdata"
    };
    // this.dialog.open(ImportdialogComponent, {
    //   width: "800px",
    //   data: sendata,
    //   hasBackdrop: false
    // });
    this.importService.importRow(sendata.filename, sendata.sheetname, sendata.rowcount,sendata.tablename,sendata.type).subscribe((response:any) => {
      if (response.error == "false") {
        this.sheetvarify = true;
        this.snackBar.open(response.message).afterClosed().subscribe(()=>{
          location.reload();
        });
      }
      else {
        this.sheetvarify = false;
        this.snackBar.open(response.message, "error");
      }

    });
    
  }
  verify(filename: any, sheetname: any) {
    this.importService.verify(filename, sheetname,"resultdata").subscribe((response: any) => {
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
      if(response.error=="true") {
      this.snackBar.open(response.message, "error");
      }
      else
      {
      this.snackBar.open(response.message,"success");
      }
    });

  }
}
