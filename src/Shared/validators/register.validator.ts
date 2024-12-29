import { Validators } from "@angular/forms";

export const UserValidators = {
    name : [Validators.required,Validators.minLength(2),Validators.maxLength(20)],
    email : [Validators.required,Validators.email],
    password: [
        Validators.required,
        Validators.pattern("^(?=.*[a-zA-Z])(?=.*\\d).{8,}$")
      ],
    rePassword : [Validators.required]
    
 }