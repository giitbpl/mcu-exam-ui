import { Component } from '@angular/core';
import { timer } from "rxjs";

@Component({
  selector: 'app-progressdialog',
  templateUrl: './progressdialog.component.html',
  styleUrls: ['./progressdialog.component.css']
})
export class ProgressdialogComponent {
  // timerDisplay:any;
  // time:any;
  // ngOnInit() {
  //   timer(0, 1000).subscribe(ec => {
  //     this.time=ec;
  //     this.timerDisplay = this.getDisplayTimer(this.time);
  //   });
  // }
  // getDisplayTimer(time: number) {
  //   const hours = '0' + Math.floor(time / 3600);
  //   const minutes = '0' + Math.floor(time % 3600 / 60);
  //   const seconds = '0' + Math.floor(time % 3600 % 60);

  //   return {
  //     hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
  //     minutes: { digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1) },
  //     seconds: { digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1) },
  //   };
  // }
}
