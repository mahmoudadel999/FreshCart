 import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{
  constructor(private _CartService:CartService){}
  userData:any;
  allUserOrders:any;

  ngOnInit(): void {
        let encodeToken:any = localStorage.getItem('eToken');
        let decodeToken = jwtDecode(encodeToken)
        this.userData = decodeToken;
        this._CartService.allOrders(this.userData.id).subscribe({
          next:(response)=>{
            console.log(response)
            this.allUserOrders=response
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
  
}
