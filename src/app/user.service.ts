import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  username = new BehaviorSubject(localStorage.getItem("username"));

  setUser(username)
  {
    this.username.next(username);
  }

  getUser()
  {
    return this.username.asObservable();
  }

  loginUser(credObj):Observable<any>
  {
    return this.hc.post("/user/loginuser",credObj);
  }

  registerUser(userObj):Observable<any>
  {
    return this.hc.post("/user/registeruser",userObj);
  }
  changePassword(credObj):Observable<any>
  {
    return this.hc.post("/user/changepassword",credObj);
  }
}
