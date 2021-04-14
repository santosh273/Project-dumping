import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private toastr: ToastrService){}

  canActivate(): boolean 
  {
    let token = localStorage.getItem("token");
    if(token)
    {
      return true;
    }
    else{
      this.toastr.warning("Unauthorized access. Login to Continue","Store");
      return false;
    }
  }
  
}
