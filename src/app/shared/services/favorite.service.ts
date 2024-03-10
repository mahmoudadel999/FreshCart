import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService{

  constructor(private _HttpClient:HttpClient) { }

  favNumber:BehaviorSubject<number> =new BehaviorSubject(0);

  addToFav(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
    { productId: productId}
    )
  }

  removeFavItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,     
    )
  }

  getFavUser():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist' ,     
    )
  }
}
