import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  constructor(private _HttpClient:HttpClient) { }

  emailForReset(userEmail:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
    userEmail
    )
  }
  resetCode(code:number):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
    {
        resetCode:`${code}`
    }
    )
  }
  resetPass(data:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
    data
    )
  }

  changePass(data:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',data)
  }

  changePersonalData(data:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/',data)
  }


}
