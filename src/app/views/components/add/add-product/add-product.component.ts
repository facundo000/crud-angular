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
