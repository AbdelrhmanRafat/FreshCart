import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedGuardGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if(localStorage.getItem('token') != null){
    _Router.navigate(['/Home']);
    return false;
  }
  else {
    return true;
  }
};
