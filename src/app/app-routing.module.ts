import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guard/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ResetPaswordComponent } from './components/reset-pasword/reset-pasword.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetCodeComponent } from './components/reset-code/reset-code.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ACategoryComponent } from './components/a-category/a-category.component';
import { ABrandComponent } from './components/a-brand/a-brand.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {path:'' ,
    canActivate:[authGuard],
    component:BlankLayoutComponent , children:[
    {path:'' , redirectTo:"home" , pathMatch:'full'},
    {path:'home' , component:HomeComponent},
    {path:'cart' , component:CartComponent},
    {path:'products' , component:ProductsComponent},
    {path:'details/:id' , component:DetailsComponent},
    {path:'categories' , component:CategoriesComponent},
    {path:'aCategory/:id' , component:ACategoryComponent},
    {path:'changePass' , component:ChangePassComponent},
    {path:'changeData' , component:PersonalDataComponent},
    {path:'brands' , component:BrandsComponent},
    {path:'aBrand/:id' , component:ABrandComponent},
    {path:'payment/:id' , component:PaymentComponent , title:'payment'},
    {path:'allorders' , component:AllordersComponent},
    {path:'favorites' , component:FavoritesComponent},

  ]},

  {path:'' ,component:AuthLayoutComponent , children:[
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent},
    {path:'forgetPasword' , component:ForgotPasswordComponent},
    {path:'resetCode' , component:ResetCodeComponent},
    {path:'resetPassword' , component:ResetPaswordComponent},
  ]},

  {path:'**', component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
