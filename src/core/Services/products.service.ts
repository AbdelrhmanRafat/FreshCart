import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Enviroment/enviroment.local';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getProducts = (currentPage : number) : Observable<any> => {
    return this._HttpClient.get(`${baseUrl}api/v1/products?page=${currentPage}`);
  }
  getProduct = (id : string) : Observable<any> => {
    return this._HttpClient.get(baseUrl + "api/v1/products/" + id);
  }
}
