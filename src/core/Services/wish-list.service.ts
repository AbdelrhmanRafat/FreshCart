import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment.local';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishListCounter : BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient) { }

  addProductToWishList= (productId : string) : Observable<any> => {
    return this._HttpClient.post(baseUrl + "api/v1/wishlist",{productId})
  }
  DeleteProductFromWishList = (productId : string) : Observable<any> => {
    return this._HttpClient.delete(baseUrl + `api/v1/wishlist/${productId}`)
  }
  getLoggedUserWishList = () : Observable<any> => {
    return this._HttpClient.get(baseUrl + "api/v1/wishlist")
  }
}
