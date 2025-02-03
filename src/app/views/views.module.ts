import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoryComponent } from './components/category/category.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { NeighborhoodComponent } from './components/neighborhood/neighborhood.component';
import { AddProductComponent } from './components/add/add-product/add-product.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBrandsComponent } from './components/add/add-brands/add-brands.component';

import { AddNeighborhoodsComponent } from './components/add/add-neighborhoods/add-neighborhoods.component';
import { AddSuppliersComponent } from './components/add/add-suppliers/add-suppliers.component';
import { AddCategorysComponent } from './components/add/add-categores/add-categorys.component';



@NgModule({
  declarations: [
    ProductsComponent,
    BrandsComponent,
    CategoryComponent,
    SuppliersComponent,
    NeighborhoodComponent,
    AddProductComponent,
    AddBrandsComponent,
    AddCategorysComponent,
    AddNeighborhoodsComponent,
    AddSuppliersComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  // exports: [
  //   ProductsComponent
  // ]
})
export class ViewsModule { }
