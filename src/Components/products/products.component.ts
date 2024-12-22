import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Product } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/Services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  private  _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService)
  private toastr = inject(ToastrService);
  loadingProductId: string | null = null;
   getProducts() {
    this._ProductsService.getProducts().subscribe({
      next : (res) => {
        this.products = res.data;
      },
      error : (err) => {

      }
    })
   }
   addToCart(productId : string) {
    this.loadingProductId = productId; // Set the loading state for the clicked product
    this._CartService.addProductToCart(productId).subscribe({
     next : (res) => {
      console.log("Hello",res.data);
      this.toastr.success("Product Added Successfully");
      this.loadingProductId = null; // Reset the loading state
     },
     error : () => {
      this.loadingProductId = null; // Reset the loading state even on error
     }
    })
   }

  ngOnInit(): void {
    this.getProducts();
  }

}
