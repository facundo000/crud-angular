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
