import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProgressdialogComponent } from './components/progressdialog/progressdialog.component';
import { JwtTokenService } from './services/jwt-token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
// import
@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog, private jwttoken: JwtTokenService, private snakebar: ToastService,private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(`Requesting `);
    // req.headers.set('clientip', ""+sessionStorage.getItem('ip'));
    var dialogref: any = null;
  // if(req.url.indexOf("getip")>=1)
  // {
  //     console.log(req.headers);
      
  // }
  // else
  // {

  // }
    if (req.url.indexOf("import/import") == -1) {

      dialogref = this.dialog.open(ProgressdialogComponent, {
        width: "300px",
        hasBackdrop: true,
        disableClose: true
      });
    }
    let token: any = this.jwttoken.getToken()
    console.log("token=>",token);
    
    // const authReq = req.clone({ headers: req.headers.set('Authorization', token) });
    const authReq = req.clone({
      setHeaders: {

        "Authorization":"Bearer "+ token,
        // "ip": this.
      }
    });
    return next.handle(authReq).pipe(
      tap({
        next: (event: any) => {
          console.log("status=", event.status);
          console.log("type=", event.type);
          // console.log("type=",event.type);
          if (event instanceof HttpResponse) {


            if (event.type == HttpEventType.Response) {
              // alert('Unauthorized access!')
              // this.modalRef.dismiss(true);
              if (dialogref != null) {
                dialogref.close();

              }
            }
          }
          return event;
        },
        error: (error) => {
          console.log("error intercept=", error);
          console.log("error status=", error.status);
          if (dialogref != null) {
            dialogref.close();

          }
          if (error.status === 0) {
            this.snakebar.open("server error :Cannot connect to server","error").afterClosed().subscribe(()=>{
                this.router.navigate(["/"]);
            });
          }
          // this.modalRef.close();

          if (error.status === 401) {
            // alert('Unauthorized access!')
          }
          else if (error.status === 404) {
            // alert('Page Not Found!')
          }

        },
        complete: () => {
          // this.modalRef.dismiss("");

        }

      })
      // map(res => {
      //   console.log("url=", req.url);
      //   if (req.url.indexOf("import/import") >= 0 && res.type == HttpEventType.Sent) {
      //     console.log("url=", req.url.indexOf("import/import"));
      //     dialogref.close();

      //   }
      //   // console.log(`Response from`,res.type);
      //   // console.log(`Response from`,res.type===HttpEventType.Response);
      //   if (res.type == HttpEventType.Response) {

      //     dialogref.close();
      //   }
      //   return res;
      // })
    );
  }
}
