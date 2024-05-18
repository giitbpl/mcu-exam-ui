import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppconfigService } from './appconfig.service';


@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private BaseUrl:any;

  constructor(private http: HttpClient,private appconfig: AppconfigService) {
    this.BaseUrl=appconfig.getConfig().serverIp;
  }
  getExportDirectoryName() {
    return this.http.get(this.BaseUrl + "import/getexportdir");
  }
  upload(file: any): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.BaseUrl + "import/upload", formData,{
      reportProgress: false,
    })
  }
  getAllFileNames() {
    return this.http.get(this.BaseUrl + "import/fileslist");
  }
  getSheetname(fname: string) {
    return this.http.post(this.BaseUrl + "import/getsheet", {
      "fname": fname
    });

  }
  getSheetRecord(sheetname:any,fname: string) {
    return this.http.post(this.BaseUrl + "import/sheetrows",{
      "fname": fname,
      "sheetname": sheetname
    });
  }
  importRow(filename:string,sheetname:string,recordno:number,tablename:any,type:string,session_name:any) 
  {
    return this.http.post(this.BaseUrl + "import/import2",{
      "filename": filename,
      "sheetname": sheetname,
      "recordno": recordno,
      "tablename": tablename,
      "type": type,
      "session": session_name
    });
  }
  verify(filename:string,sheetname:string,type:string)
  {
    return this.http.post(this.BaseUrl + "import/verify",{
      "filename": filename,
      "sheetname": sheetname,
      "type": type
      // "recordno": recordno
    });
  }
  backup(tablename:string)
  {
    return this.http.post(this.BaseUrl + "export/backup",{
      "tablename": tablename
    },{
      responseType:'blob',
      
    });
  }
  createTable(session:any,year:any)
  {
    return this.http.post(this.BaseUrl + "import/createtable",
    {
        session: session,
        year: year,
        
    });

  }
  getAllTables()
  {
    return this.http.get(this.BaseUrl +"import/getalltablesname");
  }
  update(filename:string,sheetname:string,recordno:number,tablename:any,type:string,session_name:any) 
  {
    return this.http.post(this.BaseUrl + "import/update",{
      "filename": filename,
      "sheetname": sheetname,
      "recordno": recordno,
      "tablename": tablename,
      "type": type,
      "session": session_name
    });
  }
}
