import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Product } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/Services/cart.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TitleSplicePipe } from '../../core/pipes/title-splice.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,SearchPipe,FormsModule,TitleSplicePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  searchTerm : string = "";
  isLoading = false;
  private  _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService)
  private toastr = inject(ToastrService);
  loadingProductId: string | null = null;
   getProducts() {
    this._ProductsService.getProducts().subscribe({
      next : (res) => {
        this.products = res.data;
      }
    })
   }
   addToCart(productId : string) {
    this.loadingProductId = productId; // Set the loading state for the clicked product
    this._CartService.addProductToCart(productId).subscribe({
     next : (res) => {
      this.toastr.success("Product Added Successfully");
      this.loadingProductId = null; // Reset the loading state
     }
    })
   }

  ngOnInit(): void {
    this.getProducts();
  }

}
