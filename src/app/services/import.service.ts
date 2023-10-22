import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http: HttpClient) {

  }
  getExportDirectoryName() {
    return this.http.get(environment.BaseUrl + "import/getexportdir");
  }
  upload(file: any): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(environment.BaseUrl + "import/upload", formData,{
      reportProgress: false,
    })
  }
  getAllFileNames() {
    return this.http.get(environment.BaseUrl + "import/fileslist");
  }
  getSheetname(fname: string) {
    return this.http.post(environment.BaseUrl + "import/getsheet", {
      "fname": fname
    });

  }
  getSheetRecord(sheetname:any,fname: string) {
    return this.http.post(environment.BaseUrl + "import/sheetrows",{
      "fname": fname,
      "sheetname": sheetname
    });
  }
  importRow(filename:string,sheetname:string,recordno:number,tablename:any) 
  {
    return this.http.post(environment.BaseUrl + "import/import",{
      "filename": filename,
      "sheetname": sheetname,
      "recordno": recordno,
      "tablename": tablename
    });
  }
  verify(filename:string,sheetname:string)
  {
    return this.http.post(environment.BaseUrl + "import/verify",{
      "filename": filename,
      "sheetname": sheetname
      // "recordno": recordno
    });
  }
  backup(tablename:string)
  {
    return this.http.post(environment.BaseUrl + "export/backup",{
      "tablename": tablename
    },{
      responseType:'blob',
      
    });
  }
  createTable(session:any,year:any)
  {
    return this.http.post(environment.BaseUrl + "import/createtable",
    {
        session: session,
        year: year
    });

  }
  getAllTables()
  {
    return this.http.get(environment.BaseUrl +"import/getalltablesname");
  }
}
