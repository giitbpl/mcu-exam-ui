import { Component } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent {
  login:number=0;
  search:number=0;

  constructor(LogsService:LogsService)
  {
    LogsService.getuseractivity().subscribe((activity:any) =>{
      console.log("activity=>",activity);
      this.search=activity.data[0].search;
      this.login=activity.data[0].login;

    });
  }
}
