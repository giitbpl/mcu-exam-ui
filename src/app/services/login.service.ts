import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {

   }
   login(data:any)
   {
    return this.http.post(environment.BaseUrl+"admin/login", data);
   }
   logout()
   {
    return this.http.get(environment.BaseUrl+"admin/logout");

   }
}
