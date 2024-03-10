import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private _EcomDataService:EcomDataService){}
  categories:Categories[]= []

  ngOnInit(): void {
    this._EcomDataService.getCategories().subscribe({
      next:(response)=>{
        this.categories=response.data
      },
      error:(err)=>{
        console.log(err)  
      }
    })
  }

}
