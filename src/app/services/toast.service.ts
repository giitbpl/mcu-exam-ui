import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastComponent } from '../components/toast/toast.component';
import { timeInterval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private cssclass: string = "bg-success"
  constructor(private dialog: MatDialog) { 
  //  setInterval(() => {
  //   this.dialog.closeAll();
  //  }, 2500);
  }
  open(message: string, type: string = "success") {
    if (type != "success") {
      this.cssclass = "bg-danger";
    }
    else {
      this.cssclass = "bg-success";
    }

    return this.dialog.open(ToastComponent, {
      width: "500px",
      hasBackdrop: false,
      data: {
        "message": message,
        "cssclass": this.cssclass
      }
    });
  }

}
