import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from '../Services/cookie.service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  
  if(req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')){
    const token = cookieService.getCookie('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          token: token
        }
      });
    }
  }
  return next(req);
};
