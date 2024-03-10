import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ShowCartDetails } from 'src/app/shared/interfaces/show-cart-details';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private _CartService:CartService , private  _Renderer2:Renderer2){}
  cartDetails:ShowCartDetails ={} as ShowCartDetails;
  showSection:boolean = false;

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        this.cartDetails = response.data;
        this.showSection =true
      }
    })
  }

  removeItem(id:string ,ref:HTMLButtonElement):void{
    this._Renderer2.setAttribute(ref , "disabled" , "true")
    this._CartService.removeCartItem(id).subscribe({
      next:(response)=>{
        this.cartDetails = response.data;
        this._Renderer2.removeAttribute(ref , "disabled");
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(ref , "disabled")
      }
    })
  }

  changeCount(count:number ,id:string ,ref:HTMLButtonElement ,ref2:HTMLButtonElement):void{
    if(count >= 1){
      this._Renderer2.setAttribute(ref , "disabled" , "true")
      this._Renderer2.setAttribute(ref2 , "disabled" , "true")
      this._CartService.plusCartItem(id , count).subscribe({
        next:(response)=>{
          console.log(response)
          this.cartDetails = response.data;
          this._Renderer2.removeAttribute(ref , "disabled")
          this._Renderer2.removeAttribute(ref2 , "disabled")
        },
        error:(err)=>{
          this._Renderer2.removeAttribute(ref , "disabled")
          this._Renderer2.removeAttribute(ref2 , "disabled")
        }
      })
    }
  }

  deleteAll():void{
    this._CartService.clearUserCart().subscribe({
      next:(response)=>{
        if(response.message == "success"){
          this.cartDetails = {} as ShowCartDetails;
          this.showSection = false;
          this._CartService.cartNumber.next(0);

        }
      }
    })
  }
}
