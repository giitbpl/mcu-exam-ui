import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
// import { ip, ipv6, mac } from 'address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'McuExamWeb';
  constructor(private http:HttpClient)
  {
    console.log("AppComponent running/");
    
//     ip();   // '192.168.0.2'
// ipv6(); // 'fe80::7aca:39ff:feb0:e67d'
// mac(function (err, addr) {
//   console.log(addr); // '78:ca:39:b0:e6:7d'
// });
    // http.get('http://localhost:3000/admin/getip').subscribe((data:any)=>{
    //   console.log("response data=",data.clientip);
    //  sessionStorage.setItem('ip',data.clientip);
    // });
  }
}
