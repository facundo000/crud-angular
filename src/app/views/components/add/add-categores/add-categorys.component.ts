import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-categorys',
  templateUrl: './add-categorys.component.html',
  styleUrls: ['./add-categorys.component.css']
})
export class AddCategorysComponent implements OnInit {

  categoryForm: FormGroup;
  brands = ['Apple', 'Microsoft', 'Google', 'Samsung']; // Ejemplo, deberías obtenerlos de un servicio
  
  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Aquí deberías cargar las marcas y categorías reales desde un servicio
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('Formulario válido:', this.categoryForm.value);
      this.onCancel()
      // Aquí iría la lógica para guardar el producto
    }
  }

  onCancel() {
    this.categoryForm.reset();
    // O navegar de vuelta usando el router
  }

}
