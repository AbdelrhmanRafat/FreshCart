import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/Services/translation.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,TranslateModule,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly _TranslationService = inject(TranslationService);
  private readonly _TranslateService = inject(TranslateService);
  removeToken(){
    localStorage.removeItem('token');
  }
  changeSelectedBackground(lang : string){
    return {
      "bg-main text-white" : (this._TranslateService.currentLang == lang),
    }
  }
  changeLang(lang : string) {
    this._TranslationService.changeLang(lang);
  }
  ngOnInit(): void {
    this._TranslationService.changedirection();
  }
  

}
