import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertErrorComponent } from '../../Shared/UI/alert-error/alert-error.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/Services/auth.service';
import { confirmPassword } from '../../Shared/utilties/confirm-password-utils';
import { UserValidators } from '../../Shared/validators/register.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent,NgClass,TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  currentStep = 1;
  currentEmail = "";
  // Form Groups ------------------------------------
forgetPassword = new FormGroup({
  email : new FormControl(null,UserValidators.email),
 })
 verificationCode = new FormGroup({
  resetCode : new FormControl(null),
 })
 resetPassword = new FormGroup({
  email : new FormControl("",UserValidators.email),
  newPassword : new FormControl(null,UserValidators.password),
 })
//-------------------------------------------------
 getValidatorClassName(controlName : string) {
  return {
    'is-valid' : !this.forgetPassword.get(controlName)?.errors && (this.forgetPassword.get(controlName)?.touched || this.forgetPassword.get(controlName)?.dirty),
    'is-invalid' : this.forgetPassword.get(controlName)?.errors && (this.forgetPassword.get(controlName)?.touched || this.forgetPassword.get(controlName)?.dirty)
   }
 }
 sendforgetPassword() {
  if(this.forgetPassword.valid)
  {
    this._AuthService.forgetPass(this.forgetPassword.value).subscribe({
      next : (res) => {
        console.log(res);
        if(res.statusMsg == "success"){
          this.currentStep = 2;
          localStorage.setItem('currenStep',this.currentStep.toString());
          let email = this.forgetPassword.get('email')?.value;
          if(email != null){
          this.resetPassword.get('email')?.setValue(email);
          localStorage.setItem('currenEmail',email);
          }
        }
      }
    })
  }
  else {
    this.forgetPassword.markAllAsTouched();
  }
 }
 sendverifyCode() {
  if(this.verificationCode.valid){
    this._AuthService.verifyResetCode(this.verificationCode.value).subscribe({
      next : (res) => {
        console.log(res);
        if(res.status == "Success"){
          this.currentStep = 3;
          localStorage.setItem('currenStep',this.currentStep.toString());
        }
      }
    })
  }
  else {
    this.forgetPassword.markAllAsTouched();
  }
 }
 sendResetPassword() {
  if(this.resetPassword.valid){
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next : (res) => {
        console.log(res);
        if(res.token != null){
          localStorage.setItem('token',res.token);
          localStorage.removeItem('currenStep');
          localStorage.removeItem('currenEmail');
          this._Router.navigate(['/Home']);
        }
      }
    })
  }
  else {
    this.forgetPassword.markAllAsTouched();
  }
 }
 ngOnInit(): void {
  this.currentStep = Number(localStorage.getItem('currenStep')) || 1;
  this.resetPassword.get('email')?.setValue(localStorage.getItem('currenEmail'));
}
 
}

