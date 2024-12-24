import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Metadata, Product } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/Services/cart.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TitleSplicePipe } from '../../core/pipes/title-splice.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,SearchPipe,FormsModule,TitleSplicePipe,MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  searchTerm : string = "";
  isLoading = false;
  private  _ProductsService = inject(ProductsService);
  currentPage = 1;
  AllProducts = 0;
  numberOfPages = 0;
  private _CartService = inject(CartService)
  private toastr = inject(ToastrService);
   getProducts() {
    this._ProductsService.getProducts(this.currentPage).subscribe({
      next : (res) => {
        this.products = res.data;
        this.AllProducts = res.results;
        this.numberOfPages = res.metadata.numberOfPages;
      }
    })
   }
   addToCart(productId : string) {
    this._CartService.addProductToCart(productId).subscribe({
     next : (res) => {
      this.toastr.success("Product Added Successfully");
     }
    })
   }
   onPageChange(operation : string = ""): void {
      if(operation == 'right')
      {
       this.currentPage += 1;
       this.getProducts();
      }
      else if(operation == 'left'){
      this.currentPage -= 1;
      this.getProducts();
      }
}

  ngOnInit(): void {
    this.getProducts();
  }

}
