import { Component, inject } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from '../../Shared/UI/alert-error/alert-error.component';
import { UserValidators } from '../../Shared/validators/register.validator';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,AlertErrorComponent,NgClass,RouterLink,TranslateModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  signIn = new FormGroup({
    email : new FormControl(null,UserValidators.email),
    password : new FormControl(null,UserValidators.password)
  })

  getValidatorClassName(controlName : string) {
    return {
      'is-valid' : !this.signIn.get(controlName)?.errors && (this.signIn.get(controlName)?.touched || this.signIn.get(controlName)?.dirty),
      'is-invalid' : this.signIn.get(controlName)?.errors && (this.signIn.get(controlName)?.touched || this.signIn.get(controlName)?.dirty)
     }
  }
  sendData() {
    if(this.signIn.valid){
      this._AuthService.signIn(this.signIn.value).subscribe({
        next : (res) => {
          if(res.message == "success"){
            localStorage.setItem('token',res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/Home']);
          }
        }
      })
    }
    else {
      this.signIn.markAllAsTouched();
    }
   }
   goToForgetPass() {
    localStorage.removeItem('currenStep');
    localStorage.removeItem('currenEmail');
   }
}
