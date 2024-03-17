import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private BaseUrl:any;

  constructor(private http:HttpClient,private appconfig: AppconfigService) {
    this.BaseUrl=appconfig.getConfig().serverIp;

   }
   getInfoLog()
   {
    return this.http.get(this.BaseUrl +"logs/all");
   }
   deleteLogs(duration:any)
   {
    return this.http.post(this.BaseUrl +"logs/del",{
      "duration":duration
    });
   }
   getuseractivity()
   {
    return this.http.get(this.BaseUrl +"logs/getuseractivity");
   }
}
