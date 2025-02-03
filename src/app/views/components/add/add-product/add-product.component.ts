import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  brands = ['Apple', 'Microsoft', 'Google', 'Samsung']; // Ejemplo, deberías obtenerlos de un servicio
  categories = ['Electrónica', 'Computación', 'Telefonía', 'Accesorios']; // Ejemplo
  
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
      category: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Aquí deberías cargar las marcas y categorías reales desde un servicio
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Formulario válido:', this.productForm.value);
      this.onCancel()
      // Aquí iría la lógica para guardar el producto
    }
  }

  onCancel() {
    this.productForm.reset();
    // O navegar de vuelta usando el router
  }
}
