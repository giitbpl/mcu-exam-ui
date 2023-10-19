import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppconfigService } from './services/appconfig.service';
// import { ip, ipv6, mac } from 'address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'McuExamWeb';
  constructor(private appconfig: AppconfigService)
  {

    console.log("AppComponent running/");
    console.log(appconfig.getConfig().serverIp);
    

  }
}
