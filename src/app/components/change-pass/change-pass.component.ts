import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordResetService } from 'src/app/password-reset.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
  constructor(private _PasswordResetService:PasswordResetService , private _Router:Router){}

  msgError:string='';
  msgSuccess:string='';
  isLoading:boolean = false;

  changePass:FormGroup = new FormGroup({
    currentPassword:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,20}$/)]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,20}$/)]),
    rePassword:new FormControl('',[Validators.required ]),
  } ,{ validators:[this.confirmPassword] } as FormControlOptions)

  confirmPassword(group:FormGroup):void{
    const password =group.get('password');
    const rePassword =group.get('rePassword');

    if(rePassword?.value == ''){
      rePassword?.setErrors( { required:true } )
    }else if(password?.value != rePassword?.value){
      rePassword?.setErrors( { mismatch:true } )
    }

  }
  handleForm():void{
    this.isLoading = true;
    if(this.changePass.valid){
      this._PasswordResetService.changePass(this.changePass.value).subscribe({
        next:(response)=> {
          if(response.message == 'success'){
            localStorage.setItem('eToken' , response.token)
            this.isLoading= false;
            this.msgError = '';
            this.msgSuccess= response.message
          }        
        },
        error:(err)=>{
          this.msgSuccess= '';
           this.msgError = err.error.message;
           this.isLoading= false;
        }
      })
    }else{
      this.changePass.markAllAsTouched();
    }
  }
}
