import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  constructor(private _FavoriteService:FavoriteService ,private _Renderer2:Renderer2 , private _ToastrService:ToastrService ,private _CartService:CartService ){}
  products:Product[] =[];
  wishListData:string[] =[]


  ngOnInit(): void {
    this._FavoriteService.getFavUser().subscribe({
      next:(response)=>{
        this.products = response.data
        this.wishListData = response.data.map((item:any)=> item._id)
      }
    })
  }

  addProduct(id:string , ref:HTMLButtonElement):void{
    this._Renderer2.setAttribute(ref , "disabled" , 'true')
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._Renderer2.removeAttribute(ref , "disabled")
      },
      error:()=>{
        this._Renderer2.removeAttribute(ref , "disabled")
      }
    })
  }

  addFav(id:string , ref:HTMLElement):void{
    this._Renderer2.setAttribute(ref , "disabled" , 'true')
    this._FavoriteService.addToFav(id).subscribe({
      next:(response)=>{
        console.log(response)
        this._ToastrService.success(response.message)
        this._FavoriteService.favNumber.next(response.data.length);
        this._Renderer2.removeAttribute(ref , "disabled")
        this.wishListData = response.data
      },
      error:()=>{
        this._Renderer2.removeAttribute(ref , "disabled")
      }
    })
  }
  
  removeFav(id:string , ref:HTMLElement):void{
    this._Renderer2.setAttribute(ref , "disabled" , 'true')
    this._FavoriteService.removeFavItem(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this._FavoriteService.favNumber.next(response.data.length);
        this._Renderer2.removeAttribute(ref , "disabled");
        this.wishListData = response.data;
        this._FavoriteService.getFavUser().subscribe({
          next:(response)=>{
            this.products = response.data
            this.wishListData = response.data.map((item:any)=> item._id)
          }
        })
      },
      error:()=>{
        this._Renderer2.removeAttribute(ref , "disabled")
      }
    })
  }

}
