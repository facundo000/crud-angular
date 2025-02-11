import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './views/components/products/products.component';
import { BrandsComponent } from './views/components/brands/brands.component';
import { CategoryComponent } from './views/components/category/category.component';
import { SuppliersComponent } from './views/components/suppliers/suppliers.component';
import { NeighborhoodComponent } from './views/components/neighborhood/neighborhood.component';
import { AddProductComponent } from './views/components/add/add-product/add-product.component';
import { AddBrandsComponent } from './views/components/add/add-brands/add-brands.component';
import { AddCategorysComponent } from './views/components/add/add-categores/add-categorys.component';
import { AddNeighborhoodsComponent } from './views/components/add/add-neighborhoods/add-neighborhoods.component';
import { AddSuppliersComponent } from './views/components/add/add-suppliers/add-suppliers.component';

const routes: Routes = [
  { 
    path: 'products', 
    component: ProductsComponent,
    children: [
      { path: 'addProducts', component: AddProductComponent },
      { path: 'update/:id', component: AddProductComponent }
    ]
  },
  { path: 'brands',
    component: BrandsComponent,
    children: [
      { path: 'addBrands', component: AddBrandsComponent },
      { path: 'update/:id', component: AddBrandsComponent }
    ]
  },
  { path: 'categories',
    component: CategoryComponent ,
    children: [
      { path: 'addCategories', component: AddCategorysComponent },
      { path: 'update/:id', component: AddCategorysComponent }
    ]
  },
  { path: 'suppliers',
    component: SuppliersComponent ,
    children: [
      { path: 'addSuppliers', component:  AddSuppliersComponent},
      { path: 'update/:id', component:  AddSuppliersComponent}
    ]

  },
  { path: 'neighborhoods', 
    component: NeighborhoodComponent ,
    children: [
      { path: 'addNeighborhoods', component: AddNeighborhoodsComponent },
      { path: 'update/:id', component: AddNeighborhoodsComponent }
    ]
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
