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

`products.component.ts`

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

`products.component.html`

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

6. Method add product

create a method in service

`product.service.ts`

```ts
addProduct( product: Product ): Observable<Product[]> {
    return this.http.post<Product[]>( `${this.apiUrl}/productos`, product )
  }
```

`add-product.component.html`

```ts
<div class="panel">
    <h2>Create Product</h2>
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label for="product-description">Product Name</label>
            <input type="text" id="product-description" formControlName="description"
                   placeholder="Enter product description">
            <div *ngIf="productForm.get('description')?.invalid && 
                      (productForm.get('description')?.dirty || productForm.get('description')?.touched)"
                 class="error-message">
                Product name is required
            </div>
        </div>

        <div class="form-group">
            <label for="id_brand">Brand</label>
            <select id="brand" formControlName="id_brand">
                <option value="" disabled>Select a brand</option>
                <option *ngFor="let brand of brands" [value]="brand.id">{{brand.name}}</option>
            </select>
            <div *ngIf="productForm.get('id_brand')?.invalid && 
                      (productForm.get('id_brand')?.dirty || productForm.get('id_brand')?.touched)"
                 class="error-message">
                Brand is required
            </div>
        </div>

        <div class="form-group">
            <label for="price">Price</label>
            <input type="number" id="price" formControlName="price"
                   placeholder="Enter product price" step="0.01">
            <div *ngIf="productForm.get('price')?.invalid && 
                      (productForm.get('price')?.dirty || productForm.get('price')?.touched)"
                 class="error-message">
                Valid price is required
            </div>
        </div>

        <div class="form-group">
            <label for="id_category">Category</label>
            <select id="id_category" formControlName="id_category">
                <option value="" disabled>Select a category</option>
                <option *ngFor="let category of categories" [value]="category.id_category">{{category.name}}</option>
            </select>
            <div *ngIf="productForm.get('id_category')?.invalid && 
                      (productForm.get('id_category')?.dirty || productForm.get('id_category')?.touched)"
                 class="error-message">
                Category is required
            </div>
        </div>

        <div class="buttons">
            <button type="submit" class="save-btn" [disabled]="!productForm.valid">
                <i class="fas fa-save"></i> Save
            </button>
            <button type="button" class="cancel-btn" (click)="onCancel()">
                <i class="fas fa-times"></i> Cancel
            </button>
        </div>
    </form>
</div>
```

`add-product.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../../services/brand.service';
import { Brand, Category } from 'src/app/interfaces';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  
  public brands: Brand[] = [];
  public categories: Category[] = []

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService, 
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      id_brand: [null, Validators.required],
      price: [0, [Validators.required,  Validators.min(0.01)]],
      id_category: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.brandService.getAllBrand().subscribe(  brands => this.brands = brands)
    this.categoryService.getAllCategories().subscribe( categories => this.categories = categories )
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value, }
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Producto guardado:', response);
          alert('Saved successfully')
          this.onCancel();          
        },
        error: (err) => {
          console.error('Error to add', err)
        }
      })            
    }
  }

  onCancel() {
    this.productForm.reset();
  }
}
```