import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private BaseUrl: any;

  constructor(private http: HttpClient, private appconfig: AppconfigService) {
    this.BaseUrl = appconfig.getConfig().serverIp;

  }
}
