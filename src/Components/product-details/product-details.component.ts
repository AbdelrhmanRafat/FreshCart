import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Product } from '../../core/interfaces/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
   
   private readonly _ProductsService = inject(ProductsService);
   private readonly _ActivatedRoute = inject(ActivatedRoute);
   private id : string | null = "";
  product? : Product;
   getProduct() {
    this._ProductsService.getProduct(this.id || "").subscribe({
      next : (res) => {
        this.product = res.data;
      }
    })
   }
   ngOnInit(): void {
    console.log(this._ActivatedRoute.paramMap.subscribe({
      next : (pram) => {
       this.id =  pram.get('id');
      },
      error : (err) => {
        console.log(err);
      }
    }));
    this.getProduct();
  }
   
}
