import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProgressdialogComponent } from './components/progressdialog/progressdialog.component';

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(`Requesting `);
    var dialogref=this.dialog.open(ProgressdialogComponent,{
      width: "200px",
      hasBackdrop:true,
      disableClose:true
    });
    
    return next.handle(req).pipe(
      map(res => {
        console.log(`Response from`,res);
        if(res.type ==4 )
        {
          
          dialogref.close();
        }
        return res;
      })
    );
  }
}
