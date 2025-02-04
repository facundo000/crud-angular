import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-neighborhoods',
  templateUrl: './add-neighborhoods.component.html',
  styleUrls: ['./add-neighborhoods.component.css']
})
export class AddNeighborhoodsComponent implements OnInit {

  neighborhoodForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.neighborhoodForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Aquí deberías cargar las marcas y categorías reales desde un servicio
  }

  onSubmit() {
    if (this.neighborhoodForm.valid) {
      console.log('Formulario válido:', this.neighborhoodForm.value);
      this.onCancel()
      // Aquí iría la lógica para guardar el producto
    }
  }

  onCancel() {
    this.neighborhoodForm.reset();
    // O navegar de vuelta usando el router
  }

}
