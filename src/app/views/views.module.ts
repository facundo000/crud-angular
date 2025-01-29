import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';



@NgModule({
  declarations: [
    ProductsComponent,
    BrandsComponent
  ],
  imports: [
    CommonModule
  ],
  // exports: [
  //   ProductsComponent
  // ]
})
export class ViewsModule { }
