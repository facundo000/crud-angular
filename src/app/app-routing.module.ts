import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './views/components/products/products.component';
import { BrandsComponent } from './views/components/brands/brands.component';
import { CategoryComponent } from './views/components/category/category.component';
import { SuppliersComponent } from './views/components/suppliers/suppliers.component';
import { NeighborhoodComponent } from './views/components/neighborhood/neighborhood.component';
import { AddProductComponent } from './views/components/add/add-product/add-product.component';

const routes: Routes = [
  { 
    path: 'products', 
    component: ProductsComponent,
    children: [
      { path: 'addProducts', component: AddProductComponent }
    ]
  },
  { path: 'brands', component: BrandsComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'neighborhoods', component: NeighborhoodComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
