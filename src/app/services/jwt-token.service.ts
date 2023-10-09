import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }
  getToken() {
    if (sessionStorage.getItem("token") == null)
      return "";
    else
      return sessionStorage.getItem("token");
  }
  saveToken(token: any) {
    sessionStorage.setItem("token", token);
  }
  deleteToken() {
    sessionStorage.clear();
  }
}
