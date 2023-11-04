import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImportService } from 'src/app/services/import.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {

  file: any; // Variable to store file
  public dirname: string = "";
  filelist: any; // Variable to store filename
  // public dirname: string = "";
  // file: any; // Variable to store file
  // filelist: any; // Variable to store filename
  sheetlist: any;
  filelistflag = false;
  sheetlistflag = false;
  sheetvarify = false;
  public rowcount: number = 0;
  public years: any;
  public tables: any;
  master_columns: any;
  excel_columns: any;
  master_columns_length = 0;
  excel_columns_length = 0;
  diffrence_columns:any;
  diffrence_columns_length:any;
  constructor(private importService: ImportService, private snackBar: ToastService, private dialog: MatDialog, private route: ActivatedRoute) {
    importService.getExportDirectoryName().subscribe((response: any) => {
      console.log("directory name=", response);

      this.dirname = response.data;
    });
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
  verify(filename: any, sheetname: any) {
    this.importService.verify(filename, sheetname,"all").subscribe((response: any) => {
      console.log(response);
      if (response.error == "false") {
        this.sheetvarify = true;
        response.data.table_column.sort(function (a:string, b:string) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        response.data.excel_column.sort(function (a:string, b:string) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        this.diffrence_columns =  response.data.excel_column.filter((x:string) => ! response.data.table_column.includes(x));
        this.diffrence_columns_length=this.diffrence_columns.length;
        // const difference = response.data.table_column.filter(o => !a2.includes(o));

        // console.log(difference);
        
        this.master_columns = response.data.table_column;
        this.excel_columns = response.data.excel_column;
        this.master_columns_length = this.master_columns.length;
        this.excel_columns_length = this.excel_columns.length;
        // this.snackBar.open(response.message);
      }
      else {
        this.sheetvarify = false;
        // this.snackBar.open(response.message, "error");
      }

    });
  }
}
