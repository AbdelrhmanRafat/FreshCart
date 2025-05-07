import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { CartService } from '../../core/Services/cart.service';
import { WishListService } from '../../core/Services/wish-list.service';
import { NavLanguageItemComponent } from "../../Shared/UI/nav-language-item/nav-language-item.component";
import { NavItemComponent } from "../../Shared/UI/nav-item/nav-item.component";
import { NavItemWithLogoComponent } from "../../Shared/UI/nav-item-with-logo/nav-item-with-logo.component";
import { CookieService } from '../../core/Services/cookie.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslateModule, NavLanguageItemComponent, NavItemComponent, NavItemWithLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _WishListService = inject(WishListService);
  private readonly _CookieService = inject(CookieService);
  
  cartCounter = 0;
  wishListCounter = 0;

  removeToken(){
    this._CookieService.removeCookie('token');
  }

  ngOnInit(): void {
    this._CartService.cartCounter.subscribe({
      next : (res) => {
        this.cartCounter = res;
      },
    })
    this._WishListService.wishListCounter.subscribe({
      next : (res) => {
        this.wishListCounter = res;
      }
    })
  }
}
