import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  msgError:string='';
  isLoading:boolean = false;

  loginForm:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required , Validators.email]),
    password:new FormControl('',[Validators.required , Validators.pattern(/^\w{6,20}$/)]),
  })

  handleForm():void{
    this.isLoading = true;
    if(this.loginForm.valid){
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=> {
          if(response.message == 'success'){
            this.isLoading= false;  
            localStorage.setItem('eToken' , response.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
          }
        },
        error:(err)=>{
          this.msgError = err.error.message;
          this.isLoading= false;        
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
