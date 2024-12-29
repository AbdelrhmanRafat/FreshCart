import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../Components/navbar/navbar.component";
import { CartService } from '../../core/Services/cart.service';
import { WishListService } from '../../core/Services/wish-list.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  private _CartService = inject(CartService);
  private _WishListService =inject(WishListService);
  getCartItems() {
     this._CartService.getLoggedUserCart().subscribe({
       next : (res) => {
          this._CartService.cartCounter.next(res.numOfCartItems);
       },
     })
    }
    getWishListItems() {
      this._WishListService.getLoggedUserWishList().subscribe({
       next : (res) => {
          this._WishListService.wishListCounter.next(res.count);
       },
     })
    }
  ngOnInit(): void {
    this.getCartItems();
    this.getWishListItems();
  }


}
