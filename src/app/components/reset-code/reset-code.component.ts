import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordResetService } from 'src/app/password-reset.service';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.css']
})
export class ResetCodeComponent {
  constructor(private _PasswordResetService:PasswordResetService , private _Router:Router){}

  msgError:string='';
  isLoading:boolean = false;

  code:FormGroup = new FormGroup({
    resetCode:new FormControl('', [Validators.required , Validators.pattern(/^\d+$/)]),
  })

  handleForm():void{
    this.isLoading = true;
    if(this.code.valid){
      this._PasswordResetService.resetCode(this.code.value.resetCode).subscribe({
        next:(response)=> {
          if(response.status =="Success"){
            this.isLoading= false; 
            this._Router.navigate(['/resetPassword']);
          }
        },
        error:(err)=>{
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      })
    }else{
      this.code.markAllAsTouched();
    }
  }
}
