import { Component } from '@angular/core';
import { PasswordResetService } from './../../password-reset.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.css']
})
export class ResetPaswordComponent {
  constructor(private _PasswordResetService:PasswordResetService , private _Router:Router , private _AuthService:AuthService){}

  msgError:string='';
  isLoading:boolean = false;

  NewPass:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required , Validators.email]),
    newPassword:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,20}$/)]),
  })

  handleForm():void{
    this.isLoading = true;
    if(this.NewPass.valid){
      this._PasswordResetService.resetPass(this.NewPass.value).subscribe({
        next:(response)=> {
          localStorage.setItem('eToken' , response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
        },
        error:(err)=>{
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      })
    }else{
      this.NewPass.markAllAsTouched();
    }
  }
}
