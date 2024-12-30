import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { TitleSplicePipe } from '../../../core/pipes/title-splice.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../../core/Services/cart.service';
import { WishListService } from '../../../core/Services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,TitleSplicePipe,TranslateModule,NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input ({required : true}) product! : Product;
  @Input() heartClass! : string;
  @Input({required : true}) addRemoveWish! : string;
  private _CartService = inject(CartService);
  private _WishListService = inject(WishListService);
  private toastr = inject(ToastrService);
  private _Router = inject(Router);
  refreshComponent() {
    this._Router.navigate(['/wishlist'], { queryParams: { refresh: new Date().getTime() } });
  }  
  addToCart(productId : string) {
    this._CartService.addProductToCart(productId).subscribe({
     next : (res) => {
      this.toastr.success("Product Added Successfully");
      this._CartService.cartCounter.next(res.numOfCartItems);
     }
    })
   }
   AddRemoveWishList(productId : string){
    if(this.addRemoveWish == 'add'){
      this._WishListService.addProductToWishList(productId).subscribe({
        next : (res) => {
        this.toastr.success("Product Added Successfully");
        this._WishListService.wishListCounter.next(res.data.length);
        }
       })
     }
     if(this.addRemoveWish == 'remove'){
      this._WishListService.DeleteProductFromWishList(productId).subscribe({
        next : (res) => {
          this.toastr.success(res.message);
          this.refreshComponent();
        }
      }
      )
     }
   }
   
}
