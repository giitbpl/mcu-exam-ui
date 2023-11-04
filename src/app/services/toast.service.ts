import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private cssclass: string = "bg-success"
  constructor(private dialog: MatDialog) { }
  open(message: string, type: string = "success") {
    if (type != "success") {
      this.cssclass = "bg-danger";
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
