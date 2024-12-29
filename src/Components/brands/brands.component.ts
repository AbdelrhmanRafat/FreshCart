import { Component, inject, OnInit } from '@angular/core';
import { Brand } from '../../core/interfaces/product';
import { BrandsService } from '../../core/Services/brands.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TranslateModule,NgClass],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  
  private readonly _TranslateService = inject(TranslateService);

  changeTextDirection(){
    return {
      "text-start" : (this._TranslateService.currentLang == "en"),
      "text-end" : (this._TranslateService.currentLang == "ar"),
    }
  }
  brands : Brand[] = [];
  private _BrandsService = inject(BrandsService);
  getBrands = () => {
   this._BrandsService.getBrands().subscribe({
    next : (res) => {
    this.brands = res.data;
    }
   })
  }

  ngOnInit(): void {
    this.getBrands();
  }

}
