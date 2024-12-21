import { Validators } from "@angular/forms";

export const UserValidators = {
    name : [Validators.required,Validators.minLength(2),Validators.maxLength(20)],
    email : [Validators.required,Validators.email],
    password : [Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")],
    rePassword : [Validators.required]
    
 }