import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  public dirname: string = "";
  file: any; // Variable to store file
  filelist: any; // Variable to store filename
  constructor(private exportService: ExportService, private snackBar: MatSnackBar) {
    exportService.getExportDirectoryName().subscribe((response: any) => {
      console.log(response);

      this.dirname = response.data;
    })
    exportService.getAllFileNames().subscribe((response: any) => {
      this.filelist = response.data;
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

      this.exportService.upload(this.file).subscribe((data: any) => {
        console.log(data);
        if (data.error == "false") {
          this.snackBar.open('File upload successfully', "close");

        }
        else {
          this.snackBar.open('File upload failed', "close");

        }
      });
    }
  }
}
