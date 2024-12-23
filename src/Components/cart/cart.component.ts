import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/Services/cart.service';
import { Cart, ProductElement,Data } from '../../core/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  
  private _CartService = inject(CartService);
  cart?: Cart = {} as Cart;
  data?: Data = {} as Data;
  products : ProductElement[] = [];
  getCartProducts() {
    this._CartService.getLoggedUserCart().subscribe({
      next : (res) => {
        this.data = res;
        this.cart = res.data;
        this.products = res.data.products;
      }
    })
  }
  RemoveProductFromCart(productID : string) {
    this._CartService.DeleteProductFromCart(productID).subscribe({
      next : (res) => {
      this.data = res;
       this.cart = res.data;
       this.products = res.data.products;
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
