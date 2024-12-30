import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../Shared/UI/alert-error/alert-error.component";
import { confirmPassword } from '../../Shared/utilties/confirm-password-utils';
import { UserValidators } from '../../Shared/validators/register.validator';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { InputUserComponent } from "../../Shared/UI/input-user/input-user.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent,NgClass,TranslateModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  register = new FormGroup({
  name : new FormControl(null,UserValidators.name),
  email : new FormControl(null,UserValidators.email),
  password : new FormControl(null,UserValidators.password),
  rePassword : new FormControl(null,UserValidators.rePassword)
 },confirmPassword)

 getValidatorClassName(controlName : string) {
  return {
    'is-valid' : !this.register.get(controlName)?.errors && (this.register.get(controlName)?.touched || this.register.get(controlName)?.dirty),
    'is-invalid' : this.register.get(controlName)?.errors && (this.register.get(controlName)?.touched || this.register.get(controlName)?.dirty)
   }
 }

 sendData() {
  console.log(this.register);
  if(this.register.valid){
    this._AuthService.signUp(this.register.value).subscribe({
      next : (res) => {
        if(res.message == "success"){
          this._Router.navigate(['/signin']);
        }
      }
    })
  }
  else {
    this.register.get("rePassword")?.setValue(null);
    this.register.markAllAsTouched();
  }
 }
}
