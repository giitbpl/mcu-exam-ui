import { Component } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  public activity_logs: any = "";
  public error_logs: string = "";

  constructor(private logService: LogsService) {
    logService.getInfoLog().subscribe((data:any) => {
      this.activity_logs = data;
      console.log(data[0]);
      
    });
  }

}
