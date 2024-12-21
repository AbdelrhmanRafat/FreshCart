import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  _ProductsService = inject(ProductsService);
   getProducts() {
    this._ProductsService.getProducts().subscribe({
      next : (res) => {
        console.log(res);
        this.products = res.data;
      },
      error : (err) => {

      }
    })
   }
    

  ngOnInit(): void {
    this.getProducts();
  }

}
