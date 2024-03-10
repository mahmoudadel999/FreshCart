import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { Product } from 'src/app/shared/interfaces/product';
import { Category } from './../../shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor( private _FavoriteService:FavoriteService, private _ActivatedRoute:ActivatedRoute ,private _EcomDataService:EcomDataService , private _Renderer2:Renderer2 , private _CartService:CartService ,private _ToastrService:ToastrService){}
  productDetails:Product  = {} as Product;
  productDetailsCat:Category  = {} as Category;
  wishListData:string[] =[];


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let id:any = params.get('id');

        this._EcomDataService.getProductDetails(id).subscribe({
          next:(response)=>{
            this.productDetails = response.data;
            this.productDetailsCat = response.data.category;
          }
        })
      }
    })
    this._FavoriteService.getFavUser().subscribe({
      next:(response)=>{
        this.wishListData = response.data.map((item:any)=> item._id)
      }
    })

  }

  addProduct(id:string , ref:HTMLButtonElement):void{
    this._Renderer2.setAttribute(ref , "disabled" , 'true')
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
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
      },
      error:()=>{
        this._Renderer2.removeAttribute(ref , "disabled")
      }
    })}

}
