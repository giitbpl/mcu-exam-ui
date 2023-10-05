import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http:HttpClient) {

   }
   getInfoLog()
   {
    return this.http.get(environment.BaseUrl +"logs/info/all");
   }
}
