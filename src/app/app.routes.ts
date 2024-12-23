import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../Layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../Layouts/main-layout/main-layout.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { SignInComponent } from '../Components/sign-in/sign-in.component';
import { SignUpComponent } from '../Components/sign-up/sign-up.component';
import { HomeComponent } from '../Components/home/home.component';
import { BrandsComponent } from '../Components/brands/brands.component';
import { CartComponent } from '../Components/cart/cart.component';
import { OrdersComponent } from '../Components/orders/orders.component';
import { ProductsComponent } from '../Components/products/products.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { CategoriesComponent } from '../Components/categories/categories.component';
import { WishListComponent } from '../Components/wish-list/wish-list.component';
import { authGuard } from '../core/guards/auth.guard';
import { ForgetPasswordComponent } from '../Components/forget-password/forget-password.component';
import { isLoggedGuardGuard } from '../core/guards/is-logged-guard.guard';
import { AddressComponent } from '../Components/address/address.component';

export const routes: Routes = [
    {path : '' , component : AuthLayoutComponent,
        canActivate : [isLoggedGuardGuard],
        children : [
        {path : '', redirectTo : 'signin', pathMatch : "full"},
        {path : 'signin', component : SignInComponent},
        {path : 'signup',component : SignUpComponent},
        {path : 'forgetpassword',component : ForgetPasswordComponent}
    ]},
    {path : '' , component : MainLayoutComponent, 
        canActivate : [authGuard],
        children : [
        {path : '', redirectTo : 'Home', pathMatch : "full"},
        {path : 'Home',component : HomeComponent},
        {path : 'brands',component : BrandsComponent},
        {path : 'wishlist',component : WishListComponent},
        {path : 'cart',component : CartComponent},
        {path : 'orders',component : OrdersComponent},
        {path : 'products',component : ProductsComponent},
        {path : 'productDetails/:id',component : ProductDetailsComponent},
        {path : 'categories',component : CategoriesComponent},
        {path : 'address/:id', component : AddressComponent}
    ]},
    {path : '**' , component : NotFoundComponent, title : "Not Found"}

];
