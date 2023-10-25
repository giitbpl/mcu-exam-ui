import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private BaseUrl:any;
  constructor(private http:HttpClient,private appconfig: AppconfigService) {
    this.BaseUrl=appconfig.getConfig().serverIp;
   }
   login(data:any)
   {
    return this.http.post(this.BaseUrl+"admin/login", data);
   }
   logout()
   {
    return this.http.get(this.BaseUrl+"admin/logout");

   }
}
