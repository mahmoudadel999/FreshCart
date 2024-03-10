import { Component, OnInit, Renderer2 } from '@angular/core';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { Product } from './../../shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
constructor(private _FavoriteService:FavoriteService, private _EcomDataService:EcomDataService , private _Renderer2:Renderer2 , private _CartService:CartService , private _ToastrService:ToastrService){}
products:Product[] =[];
pageSize:number =0;
currentPage:number =0;
total:number =0;
wishListData:string[] =[]


ngOnInit(): void {
  this._EcomDataService.getAllProducts().subscribe({
    next:(response)=>{
      this.products = response.data;
      this.pageSize =response.metadata.limit;
      this.currentPage =response.metadata.currentPage;
      this.total = response.results
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

pageChanged(event:any):void{
  this._EcomDataService.getAllProducts(event).subscribe({
    next:(response)=>{
      this.products = response.data;
      this.pageSize =response.metadata.limit;
      this.currentPage =response.metadata.currentPage;
      this.total = response.results
    }
  })
}
}
