import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr = inject(ToastrService);
  return next(req).pipe(catchError(
    (err) => {
      toastr.error(err.error.message);
      return throwError(() => err)
    }
  ));
};