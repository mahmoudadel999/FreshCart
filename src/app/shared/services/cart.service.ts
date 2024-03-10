import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number> =new BehaviorSubject(0);

  addToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
    { productId: productId}
    )
  }

  getCartUser():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart' ,     
    )
  }
  removeCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,     
    )
  }
  plusCartItem(id:string , count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,     
    {
      "count": `${count}`
    },
    )
  }
  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, 
    )
  }

  checkOut(cardId:string , userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=https://hanaa-elawady.github.io/FreshCart`,
    {
      shippingAddress: userData
    },
    )
  }
  allOrders(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    )
  }
}
