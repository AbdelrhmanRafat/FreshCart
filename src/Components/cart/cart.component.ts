import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/Services/cart.service';
import { Cart, ProductElement,Data } from '../../core/interfaces/cart';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  
  private _CartService = inject(CartService);
  cart?: Cart = {} as Cart;
  data?: Data = {} as Data;
  products : ProductElement[] = [];
  bGetCartItems = false;
  getCartProducts() {
    this.bGetCartItems = false;
    this._CartService.getLoggedUserCart().subscribe({
      next : (res) => {
        this.data = res;
        this.cart = res.data;
        this.products = res.data.products;
        this.bGetCartItems = Boolean(this.data?.numOfCartItems);
        this._CartService.cartCounter.next(this.data?.numOfCartItems || 0);
      }
    })
  }
  RemoveProductFromCart(productID : string) {
    this._CartService.DeleteProductFromCart(productID).subscribe({
      next : (res) => {
       this.data = res;
       this.cart = res.data;
       this.products = res.data.products;
       this._CartService.cartCounter.next(this.data?.numOfCartItems || 0);
      }
      
    })
  }
  updateProductQty(productID : string,count : number) {
    this._CartService.UpdateProductQty(productID,count).subscribe({
      next : (res) => {
        this.data = res;
        this.cart = res.data;
        this.products = res.data.products;
      }
    })
  }
  ngOnInit(): void {
    this.getCartProducts();
  }
}
