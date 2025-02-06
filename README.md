<p align="center">
<img src="https://www.svgrepo.com/show/373427/angular.svg" width="200" alt="Nest Logo"/>
</p>

# Step by step in Angular v16

1. Create a service

`ng g s [name]`

2. Create the environment

`ng generate environments`

3. Add client module

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { LayoutComponent } from './shared/components/Layout/Layout.component';
import { AddComponent } from './shared/components/add/add.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

4. Create the element interface

```ts
import { Brand } from "./brand";
import { Category } from "./category";

export interface Product {
    cod_product: string;
    description: string;
    price:       string;
    id_brand:    Brand;
    id_category: Category;
}
```



5. Method GetAll

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url:string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ this.url }/productos`)
  }
}
```
Implement in component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/index';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',  
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  
  public products: Product[] = [];
  
  constructor( private productService: ProductService ) {}

  ngOnInit(): void {    
    this.productService.getAllProducts()
    .subscribe( products => this.products = products)
  } 
  
}
```
implement in component.html

```ts
<div class="table-container">
  <table class="styled-table">
    <thead>
      <tr>
        <th>Product name</th>
        <th>Brand</th>
        <th>Category</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let product of products">
        <th scope="row">{{ product.description }}</th>
        <td>{{ product.id_brand.name }}</td>
        <td>{{ product.id_category.name }}</td>
        <td>{{ product.price }}</td>
        <td>
          <a href="#" class="edit">Edit</a>
          <a href="#" class="delete">Delete</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<router-outlet></router-outlet>
```

6. Method GetById
