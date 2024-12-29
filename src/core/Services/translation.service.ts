import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translateService: TranslateService) { 
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translateService.setDefaultLang(savedLang);
    this.translateService.use(savedLang);
    this.changedirection();
  }
  changedirection() {
    const savedLang = localStorage.getItem('lang') || 'en';
    if(savedLang == 'en'){
     document.documentElement.dir = 'ltr';
     document.documentElement.lang = 'en';
    }
    else if(savedLang == 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }
  changeLang(lang : string){
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    localStorage.setItem('lang',lang);
    this.changedirection();
  }
}
