import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.css']
})
export class AddBrandsComponent implements OnInit {

  brandForm: FormGroup;
  brands = ['Apple', 'Microsoft', 'Google', 'Samsung']; // Ejemplo, deberías obtenerlos de un servicio
  
  constructor(private fb: FormBuilder) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Aquí deberías cargar las marcas y categorías reales desde un servicio
  }

  onSubmit() {
    if (this.brandForm.valid) {
      console.log('Formulario válido:', this.brandForm.value);
      this.onCancel()
      // Aquí iría la lógica para guardar el producto
    }
  }

  onCancel() {
    this.brandForm.reset();
    // O navegar de vuelta usando el router
  }

}
