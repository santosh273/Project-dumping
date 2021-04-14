import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { faUserTie,faKey } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  faUserTie = faUserTie;
  faKey = faKey;

  forgotpwdForm : FormGroup;
  submitted = false;

  constructor(private us:UserService,private rt:Router,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.forgotpwdForm = new FormGroup(
      {
        username : new FormControl(null,Validators.required),
        password : new FormControl(null,[Validators.required,Validators.minLength(4)]),
        cpassword : new FormControl(null,[Validators.required,Validators.minLength(4)])
      }
    )
  }

  gc()
  {
    return this.forgotpwdForm.controls;
  }

  onSubmit()
  {
    this.submitted = true;
    if(this.forgotpwdForm.valid)
    {
      let credObj = this.forgotpwdForm.value;
      if(credObj.password == credObj.cpassword)
      {
        this.us.changePassword(credObj).subscribe(
          res => {
            if(res["message"] == "Invalid Username")
            {
              this.toastwarning("Reset Page",res["message"]);
            }
            else{
              this.toastsuccess("Reset Page","Password changed successfully");
              setTimeout(()=>this.rt.navigateByUrl("/forms/login"),2500);
            }
          },
          err => {
            console.log(err);
            this.toasterror("Reset Page","Something went Wrong...Try again...");
          }
        )
      }
      else{
        this.toastwarning("Reset Page","Passwords are not matched. Enter again");
      }
    }
    
  }

  toastsuccess(heading,message)
  {
    this.toastr.success(message,heading);
  }

  toasterror(heading,message)
  {
    this.toastr.error(message,heading);
  }

  toastwarning(heading,message)
  {
    this.toastr.warning(message,heading);
  }

}
