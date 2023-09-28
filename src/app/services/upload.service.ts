import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }
  // getAllUsers()
  // {
  //   return this.http.get(environment.BaseUrl+"admin/alluser");
  // }
  // registerUser(userdata:any)
  // {
  //   return this.http.post(environment.BaseUrl+"admin/register", userdata);
  // }
  upload(file:any):Observable<any> {
  console.log(file);
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(environment.BaseUrl+"export/upload", formData)
}
}

