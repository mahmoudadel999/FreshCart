import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule}from "@angular/common/http";
import{BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyhttpInterceptor } from './shared/interceptors/myhttp.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ResetPaswordComponent } from './components/reset-pasword/reset-pasword.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetCodeComponent } from './components/reset-code/reset-code.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { SearchPipe } from './shared/pipe/search.pipe';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ABrandComponent } from './components/a-brand/a-brand.component';
import { ACategoryComponent } from './components/a-category/a-category.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    PaymentComponent,
    AllordersComponent,
    ResetPaswordComponent,
    ForgotPasswordComponent,
    ResetCodeComponent,
    ChangePassComponent,
    SearchPipe,
    PersonalDataComponent,
    ABrandComponent,
    ACategoryComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,   
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule
    ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor ,multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor ,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
