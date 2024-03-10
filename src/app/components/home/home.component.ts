import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
constructor(private _EcomDataService:EcomDataService ,private _CartService:CartService , private _ToastrService:ToastrService , private _Renderer2:Renderer2 , private _FavoriteService:FavoriteService){}
products:Product[] =[];
categories:Categories[] =[];
term:string ='';
wishListData:string[] =[]

ngOnInit():void{
  this._EcomDataService.getAllProducts().subscribe({
    next:(response)=>{
      this.products = response.data
    }
  })

  this._EcomDataService.getCategories().subscribe({
    next:(response)=>{
      this.categories = response.data
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
  })
}


categoryOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
  autoplayTimeout:7000,
  autoplaySpeed:1000,
  dots: true,
  dotsSpeed:700,
  navSpeed: 700,
  navText: ['next', 'previous'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
}


mainSlideOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:true,
  pullDrag: false,
  dots: true,
  autoplayTimeout:7000,
  autoplaySpeed:1000,
  navSpeed: 700,
  dotsSpeed:1000,
  navText: ['next', 'previous'],
  items: 1,
  nav: false
}

}
