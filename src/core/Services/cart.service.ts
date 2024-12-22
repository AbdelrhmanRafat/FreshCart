import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment.local';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  
  addProductToCart= (productId : string) : Observable<any> => {
    return this._HttpClient.post(baseUrl + "api/v1/cart",{productId},{
      headers : {
        token : localStorage.getItem('token')!,
      }
    })
  }
  UpdateProductQty = (productId : string,count : number) : Observable<any> => {
    return this._HttpClient.put(baseUrl + `api/v1/cart/${productId}`,{count},{
      headers : {
        token : localStorage.getItem('token')!,
      }
    })
  }
  DeleteProductFromCart = (productId : string) : Observable<any> => {
    return this._HttpClient.delete(baseUrl + `api/v1/cart/${productId}`,{
      headers : {
        token : localStorage.getItem('token')!,
      }
    })
  }
  ClearProductsFromCart = () : Observable<any> => {
    return this._HttpClient.delete(baseUrl + `api/v1/cart`,{
      headers : {
        token : localStorage.getItem('token')!,
      }
    })
  }
  getLoggedUserCart = () : Observable<any> => {
    return this._HttpClient.get(baseUrl + "api/v1/cart",{
      headers : {
        token : localStorage.getItem('token')!,
      }
    })
  }


}
