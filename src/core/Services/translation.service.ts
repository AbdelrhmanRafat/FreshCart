import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private isBrowser: boolean;

  constructor(
    private translateService: TranslateService,
    private _CookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const savedLang = this.isBrowser
      ? this._CookieService.getCookie('lang') || 'en'
      : 'en'; // fallback default for server

    this.translateService.setDefaultLang(savedLang);
    this.translateService.use(savedLang);

    if (this.isBrowser) {
      this.changedirection(savedLang);
    }
  }

  changedirection(lang?: string) {
    if (!this.isBrowser) return;

    const savedLang = lang || this._CookieService.getCookie('lang') || 'en';

    if (savedLang === 'en') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else if (savedLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }

  changeLang(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);

    if (this.isBrowser) {
      this._CookieService.setCookie('lang', lang);
      this.changedirection(lang);
    }
  }
}