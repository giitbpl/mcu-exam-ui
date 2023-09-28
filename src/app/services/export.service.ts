import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http:HttpClient) {

   }
   getExportDirectoryName() {
   return this.http.get(environment.BaseUrl+"export/getexportdir");
   }
   upload(file:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(environment.BaseUrl+"export/upload", formData)
}
}
