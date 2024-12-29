import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/Services/categories.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule,NgClass],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  
  categories : Category[] = [];
  private _TranslateService = inject(TranslateService);
  private _CategoriesService = inject(CategoriesService);
  

  changeTextDirection(){
    return {
      "text-start" : (this._TranslateService.currentLang == "en"),
      "text-end" : (this._TranslateService.currentLang == "ar"),
    }
  }
  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next : (res) => {
      this.categories = res.data;
      }
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
