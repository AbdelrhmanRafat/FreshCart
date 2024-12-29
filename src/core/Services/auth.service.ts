import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment.local';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  signUp = (user : any) : Observable<any> => {
    return this._HttpClient.post(baseUrl + "api/v1/auth/signup",user);
  }
  signIn = (user : any) : Observable<any> => {
    return this._HttpClient.post(baseUrl + "api/v1/auth/signin",user);
  }
  saveUserData(){
    let token = localStorage.getItem('token');
    if(token != null){
      let decode = jwtDecode(token);
      console.log(decode);
    }
    else{
      localStorage.clear();
    }
  }
   
  forgetPass(email : any) : Observable<any> {
    return this._HttpClient.post(baseUrl + "api/v1/auth/forgotPasswords",email);
  }

  verifyResetCode(code : any) : Observable<any> {
    return this._HttpClient.post(baseUrl + "api/v1/auth/verifyResetCode",code);
  }
   
  resetPassword(resetData : any) : Observable<any> {
    return this._HttpClient.put(baseUrl + "api/v1/auth/resetPassword",resetData);
  }


}
