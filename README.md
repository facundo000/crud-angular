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



5. Create method GetAll

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

6. Implement in component.ts
