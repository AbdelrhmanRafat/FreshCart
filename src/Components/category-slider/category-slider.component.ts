import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/Services/categories.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule,TranslateModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit{
  categories : Category[] = [];
  private _CategoriesService = inject(CategoriesService);
   
  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next : (res) => {
      this.categories = res.data;
      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 1,
    autoplay: true,
    autoplayTimeout: 1, // Minimal timeout for continuous movement
    autoplayHoverPause: false, // Don't pause on hover
    smartSpeed: 300, // Adjust to control the smoothness
    rtl : true,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 4,
      },
      740: {
        items: 4,
      },
      940: {
        items: 8,
      },
    },
    nav: false,
  };
  
  ngOnInit(): void {
    this.getCategories();
  }
}
