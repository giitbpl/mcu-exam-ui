import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-trs',
  templateUrl: './trs.component.html',
  styleUrls: ['./trs.component.css']
})
export class TrsComponent {
constructor(private snakebar:MatSnackBar,private toastservice:ToastService)
{

}
  show()
{
  // this.snakebar.open("adhkjadh ajhdakjd akjdh","close",{
  //   duration: 500000,
  //  panelClass:'bg-info'
  // });
  this.toastservice.open("hello world","success").afterClosed().subscribe(() =>{
    // alert("Hello world!");
  });
}
}
