import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WishListService } from '../../core/Services/wish-list.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,SearchPipe,FormsModule,TitleSplicePipe,MatPaginatorModule,TranslateModule,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy {
  products : Product[] = [];
  searchTerm : string = "";
  isLoading = false;
  private  _ProductsService = inject(ProductsService);
  _TranslateService = inject(TranslateService);
  currentPage = 1;
  AllProducts = 0;
  numberOfPages = 0;
  private _CartService = inject(CartService);
  private _WishListService =inject(WishListService);
  private toastr = inject(ToastrService);
  private getProductsSubscription : Subscription = new Subscription();
  private getCartItemsSubscription : Subscription = new Subscription();
  private AddtoCartSubscription : Subscription = new Subscription();
   getProducts() {
    this.getProductsSubscription =  this._ProductsService.getProducts(this.currentPage).subscribe({
      next : (res) => {
        this.products = res.data;
        this.AllProducts = res.results;
        this.numberOfPages = res.metadata.numberOfPages;
      }
    })
   }

   addToCart(productId : string) {
    this.AddtoCartSubscription =  this._CartService.addProductToCart(productId).subscribe({
     next : (res) => {
      this.toastr.success("Product Added Successfully");
      this._CartService.cartCounter.next(res.numOfCartItems);
     }
    })
   }
   addToWishList(productId : string){
    this._WishListService.addProductToWishList(productId).subscribe({
      next : (res) => {
      this.toastr.success("Product Added Successfully");
      this._WishListService.wishListCounter.next(res.data.length);
      }
     })
   }

  // Check if the current page is the first page
  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  // Check if the current page is the last page
  isLastPage(): boolean {
    return this.currentPage === this.numberOfPages;
  }

  // Handle page changes
  onPageChange(operation: string = ''): void {
    if (operation === 'next') {
      this.currentPage += 1; // Navigate to the next page
    } else if (operation === 'prev') {
      this.currentPage -= 1; // Navigate to the previous page
    }
    this.getProducts();
  }
  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.getCartItemsSubscription.unsubscribe();
    this.getProductsSubscription.unsubscribe();
    this.AddtoCartSubscription.unsubscribe();
  }

}