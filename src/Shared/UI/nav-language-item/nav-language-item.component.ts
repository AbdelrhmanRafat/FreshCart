import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../core/Services/translation.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-language-item',
  standalone: true,
  imports: [TranslateModule,NgClass],
  templateUrl: './nav-language-item.component.html',
  styleUrl: './nav-language-item.component.scss'
})
export class NavLanguageItemComponent implements OnInit {

  private readonly _TranslationService = inject(TranslationService);
  private readonly _TranslateService = inject(TranslateService);
  @Input() styleClass! : string;
  changeSelectedBackground(lang : string){
    return {
      "fs-bold text-main" : (this._TranslateService.currentLang == lang),
    }
  }
  changeLang(lang : string) {
    this._TranslationService.changeLang(lang);
  }
  ngOnInit(): void {
    this._TranslationService.changedirection();
  }
}
