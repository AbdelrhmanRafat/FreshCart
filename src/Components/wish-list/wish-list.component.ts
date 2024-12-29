import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/Services/wish-list.service';
import { Product } from '../../core/interfaces/product';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { TitleSplicePipe } from '../../core/pipes/title-splice.pipe';
import { CartService } from '../../core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule,RouterLink,TitleSplicePipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
   
   private readonly _WishListService = inject(WishListService);
   private readonly _CartService = inject(CartService);
   private toastr = inject(ToastrService);
   products : Product[] = [];
   getAllWishList() {
    this._WishListService.getLoggedUserWishList().subscribe({
      next : (res) => {
        this.products = res.data;
        this._WishListService.wishListCounter.next(res.count);
      }
    })
   }
   removeFromWishList(productId : string) {
    this._WishListService.DeleteProductFromWishList(productId).subscribe({
      next : (res) => {
        this.toastr.success(res.message);
        this.getAllWishList(); 
      }
    }
    )
   }
   addToCart(productId : string) {
    this._CartService.addProductToCart(productId).subscribe({
     next : (res) => {
      this.toastr.success("Product Added Successfully");
      this._CartService.cartCounter.next(res.numOfCartItems);
     }
    })
   }
   ngOnInit(): void {
    this.getAllWishList(); 
  }
}
