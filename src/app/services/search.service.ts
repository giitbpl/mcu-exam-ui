import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private BaseUrl:any;

  constructor(private http:HttpClient,private appconfig: AppconfigService) {
    this.BaseUrl=    appconfig.getConfig().serverIp;
  }
   
   search(formdata:any)
   {
    return this.http.post(this.BaseUrl+"search/search", formdata);
   }
}
