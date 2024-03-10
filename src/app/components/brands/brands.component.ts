import { Component, OnInit } from '@angular/core';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  constructor(private _EcomDataService:EcomDataService){}
  brands:any

  ngOnInit(): void {
    this._EcomDataService.getBrands().subscribe({
      next:(response)=>{
        this.brands= response.data
      },
      error:(err)=>{
        console.log(err)  
      }
    })
  }

}
