import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordResetService } from 'src/app/password-reset.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private _PasswordResetService:PasswordResetService , private _Router:Router){}

  msgError:string='';
  isLoading:boolean = false;

  forgetPassword:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required , Validators.email]),
  })

  handleForm():void{
    this.isLoading = true;
    if(this.forgetPassword.valid){
      this._PasswordResetService.emailForReset(this.forgetPassword.value).subscribe({
        next:(response)=> {
          if(response.statusMsg =="success"){
            this.isLoading= false; 
            this._Router.navigate(['/resetCode']);
          }
        },
        error:(err)=>{
          this.msgError = err.error.message
          this.isLoading = false;
        }
      })
    }else{
      this.forgetPassword.markAllAsTouched();
    }
  }
  }
