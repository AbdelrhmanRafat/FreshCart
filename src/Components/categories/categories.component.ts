import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/Services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  
  categories : Category[] = [];
  private _CategoriesService = inject(CategoriesService);
   
  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next : (res) => {
      this.categories = res.data;
      },
      error : (err) => {

      }
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
