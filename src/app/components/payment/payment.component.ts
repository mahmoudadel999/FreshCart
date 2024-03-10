import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _CartService:CartService){}
  id!:any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.id= params.get('id');
      }
    })
  }

  orderForm:FormGroup = new FormGroup({
    details:new FormControl(''),
    phone:new FormControl(''),
    city:new FormControl(''),
  })

  handleForm():void{
    this._CartService.checkOut(this.id , this.orderForm.value).subscribe({
      next:(response)=>{
        if(response.status == "success"){
          window.open(response.session.url ,'_self')
        }
      }
    })
  }
}