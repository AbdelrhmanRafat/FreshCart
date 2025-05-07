import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '../Services/cookie.service';

export const isLoggedGuardGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _CookieService = inject(CookieService);
  
  if(_CookieService.getCookie('token') != null){
    _Router.navigate(['/Home']);
    return false;
  }
  return true;
};
