import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../../services/brand.service';
import { Brand, Category, Product } from 'src/app/interfaces';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  
  public brands: Brand[] = [];
  public categories: Category[] = []

  productId: string | null= null
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService, 
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      id_brand: [null, Validators.required],
      price: [0, [Validators.required,  Validators.min(0.01)]],
      id_category: [null, Validators.required]
    });
  }

  get currentProduct(): Product {
    const product = this.productForm.value as Product;
    
    return product;
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    this.loadBrandAndCategories();

    if(this.isEditMode) {
      this.loadProductData();
    }
    
  }

  private loadBrandAndCategories(): void {
    forkJoin({
      brands: this.brandService.getAllBrand(),
      categories: this.categoryService.getAllCategories()
    }).subscribe(({ brands, categories }) => {
      this.brands = brands;
      this.categories = categories;
    });
  }

  private loadProductData(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.productService.getProductByid(id) ),      
    ).subscribe( product => {

      if(!product) {
        return this.router.navigateByUrl('/');
      }

      const priceString: string = product.price;
      const priceNumber: number = parseFloat(priceString.replace(/[^\d.-]/g, ''))

      const formData = {
        // cod_product: product.cod_product,
        description: product.description,
        id_brand: product.id_brand ? product.id_brand.id : null,
        price: priceNumber,
        id_category: product.id_category ? product.id_category.id_category : null
      };
      
      this.productForm.patchValue( formData );
      return;
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      let formData = this.productForm.value;

      if(this.isEditMode) {

        console.log(formData)
        this.productService.updateProduct(this.productId!, formData)
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err) => {
            console.log(err)
            this.handleError
          }
        })
      } else {
        this.productService.addProduct(formData).subscribe({
          next: (response) => {
            this.handleSuccess();
          },
          error: (err) => {
            console.error('Error to add', err)
          }
        })            
      }
    }
  }

  private handleSuccess(): void {
    alert('Saved successfully');
    this.onCancel();
  }

  private handleError(err: any): void {
    console.error('Error:', err);
    // Mostrar mensaje de error al usuario
  }

  onCancel() {
    this.productForm.reset();
  }

}
