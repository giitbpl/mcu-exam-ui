import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface AppConfig {
  serverIp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {

  private config: AppConfig;
    loaded = false;
    constructor(private http: HttpClient) {}
    loadConfig(): Promise<void> {
      return this.http
          .get<AppConfig>('assets/config/config.json')
          .toPromise()
          .then((data:any) => {
              this.config = data;
              this.loaded = true;
          });
  }
    
    getConfig(): AppConfig {
        return this.config;
    }
}
