import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/Services/wish-list.service';
import { Product } from '../../core/interfaces/product';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TitleSplicePipe } from '../../core/pipes/title-splice.pipe';
import { CartService } from '../../core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCardComponent } from "../../Shared/UI/product-card/product-card.component";

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule, ProductCardComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
   
   private readonly _WishListService = inject(WishListService);
   private readonly ActivatedRoute = inject(ActivatedRoute);
   products : Product[] = [];
   getAllWishList() {
    this._WishListService.getLoggedUserWishList().subscribe({
      next : (res) => {
        this.products = res.data;
        this._WishListService.wishListCounter.next(res.count);
      }
    })
   }
   ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe(() => {
      this.getAllWishList(); 
    });
  }
}
