import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setCookie(name: string, value: string, days: number = 7): void {
    if (!this.isBrowser) return;

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  getCookie(name: string): string | null {
    if (!this.isBrowser) return null;

    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }

  removeCookie(name: string): void {
    if (!this.isBrowser) return;

    this.setCookie(name, '', -1);
  }

  clearAllCookies(): void {
    if (!this.isBrowser) return;

    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const cookieName = cookie.split('=')[0].trim();
      this.removeCookie(cookieName);
    }
  }
}