import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/index';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

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

  deleteProduct(productId: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(productId).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success"
            });
            this.products = this.products.filter(p => p.cod_product !== productId);
          },
          error: (err:any) => {
            Swal.fire({
              title: "Error!",
              text: `Could not delete product, ${err}`,
              icon: "error"
            });
          }
        });
      }
    });
  }
  
}
