import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  constructor(private _AuthService:AuthService , private _CartService:CartService , private _Renderer2:Renderer2 , private _FavoriteService:FavoriteService){}

  @ViewChild('nav') navElement!:ElementRef

  @HostListener('window:scroll')
  onScoll():void{
    if(scrollY > 0){
      this._Renderer2.addClass(this.navElement.nativeElement ,"py-3" )
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement ,"py-3" )

    }
  }
  cartNumber:number= 0;
  favNumber:number= 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartNumber= data;
      },
      error:()=>{
        this.cartNumber= 0;
      }
    });

    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        this.cartNumber = response.numOfCartItems
      },
      error:()=>{
        this.cartNumber= 0;
      }
    })

    this._FavoriteService.favNumber.subscribe({
      next:(data)=>{
        this.favNumber= data;
      },
      error:()=>{
        this.favNumber= 0;
      }
    });

    this._FavoriteService.getFavUser().subscribe({
      next:(response)=>{
        this.favNumber = response.count
      },
      error:()=>{
        this.favNumber= 0;
      }
    })
  }

  logOutUser():void{
    this._AuthService.logOut();      
  }
}
