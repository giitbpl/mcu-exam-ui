import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BaseUrl:any;

  constructor(private http:HttpClient,private appconfig: AppconfigService) {
  this.BaseUrl=  appconfig.getConfig().serverIp;
  console.log(this.BaseUrl);
  
  }
   
   getAllUsers() {
   return this.http.get(this.BaseUrl+"admin/alluser");
   }
   registerUser(userdata:any)
  {
    return this.http.post(this.BaseUrl+"admin/register", userdata);
  }
  getUserByUid(uid:any)
  {
    // console.log(uid);
    
    return this.http.get(this.BaseUrl+"admin/getuserbyuid/"+uid);
  }
  getUserDetailByToken(token:any)
  {
    return this.http.post(this.BaseUrl+"admin/token", {
      "token": token
    });

  }
changePwd(formdata:any)
{
  return this.http.post(this.BaseUrl+"admin/chpwd",formdata  );
}
updateuser(formdata:any)
{
  return this.http.post(this.BaseUrl+"admin/updateuser",formdata  );

}
changeUserstatus(uid:any)
{
  return this.http.post(this.BaseUrl+"admin/changestatus",{
    "userid":uid
  });

}
}