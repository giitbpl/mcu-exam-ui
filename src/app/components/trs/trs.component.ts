import { Component, Input, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-trs',
  templateUrl: './trs.component.html',
  styleUrls: ['./trs.component.css']
})
export class TrsComponent {
  @Input() studetail:any=[];
  @Input() showdata:boolean = false;
  name: string;
  constructor(private snakebar: MatSnackBar, private toastservice: ToastService) {
    console.log("studedetail=>", this.studetail);

  }
  ngOnChanges(changes: SimpleChanges) {

    this.studetail = changes["studetail"].currentValue;
    console.log(this.studetail);
    this.name = this.studetail.student[0].name;
    this.showdata=true;
  }

  show() {

    this.toastservice.open("hello world", "success").afterClosed().subscribe(() => {
      // alert("Hello world!");
    });
  }
}
