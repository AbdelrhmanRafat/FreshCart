import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment.local';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { 
    }
    getCheckOutSession = (cartId : string,shippingAddress : object) : Observable<any> => {
      return this._HttpClient.post
      (`${baseUrl}api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress})
    }
  
}
