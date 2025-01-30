import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoryComponent } from './components/category/category.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { NeighborhoodComponent } from './components/neighborhood/neighborhood.component';
import { AddProductComponent } from './components/add/add-product/add-product.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ProductsComponent,
    BrandsComponent,
    CategoryComponent,
    SuppliersComponent,
    NeighborhoodComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  // exports: [
  //   ProductsComponent
  // ]
})
export class ViewsModule { }
