import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

   }
   getAllUsers() {
   return this.http.get(environment.BaseUrl+"admin/alluser");
   }
   registerUser(userdata:any)
  {
    return this.http.post(environment.BaseUrl+"admin/register", userdata);
  }
  getUserByUid(uid:any)
  {
    // console.log(uid);
    
    return this.http.get(environment.BaseUrl+"admin/getuserbyuid/"+uid);
  }
  getUserDetailByToken(token:any)
  {
    return this.http.post(environment.BaseUrl+"admin/token", {
      "token": token
    });

  }
changePwd(formdata:any)
{
  return this.http.post(environment.BaseUrl+"admin/chpwd",formdata  );
}
updateuser(formdata:any)
{
  return this.http.post(environment.BaseUrl+"admin/updateuser",formdata  );

}
changeUserstatus(uid:any)
{
  return this.http.post(environment.BaseUrl+"admin/changestatus",{
    "userid":uid
  });

}
}