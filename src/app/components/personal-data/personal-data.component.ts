import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordResetService } from 'src/app/password-reset.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent {
  constructor(private _PasswordResetService:PasswordResetService , private _Router:Router){}

  msgError:string='';
  msgSuccess:string='';
  isLoading:boolean = false;

  changePersonalData:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email:new FormControl('', [Validators.required , Validators.email]),
    phone:new FormControl('', [Validators.required , Validators.pattern(/01[0125][0-9]{8}/)]),
  })



  handleForm():void{
    this.isLoading = true;
    if(this.changePersonalData.valid){
      this._PasswordResetService.changePersonalData(this.changePersonalData.value).subscribe({
        next:(response)=> {
          if(response.message == 'success'){
          this.changePersonalData.reset()
          this.isLoading= false;
          this.msgError = '';
          this.msgSuccess= response.message          }        
        },
        error:(err)=>{
          console.log(err)
          this.msgSuccess= '';
          this.msgError = err.error.message;
          this.isLoading= false;
        }
      })
    }else{
      this.changePersonalData.markAllAsTouched();
    }
  }
}
