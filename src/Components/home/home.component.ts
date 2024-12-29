import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { ProductsSliderComponent } from "../products-slider/products-slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, ProductsSliderComponent, CategorySliderComponent,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   
}
