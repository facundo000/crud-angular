import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-suppliers',
  templateUrl: './add-suppliers.component.html',
  styleUrls: ['./add-suppliers.component.css']
})
export class AddSuppliersComponent implements OnInit {

  suppliersForm: FormGroup;
  neighborhood = ['Talanga', 'av rokefort', 'san javier', 'Comechingon']; // Ejemplo
  
  constructor(private fb: FormBuilder) {
    this.suppliersForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required, ],
      email: ['', Validators.required, ],
      neighborhood: ['', Validators.required,],
    });
  }
  ngOnInit(): void {
    // Aquí deberías cargar las marcas y categorías reales desde un servicio
  }

  onSubmit() {
    if (this.suppliersForm.valid) {
      console.log('Formulario válido:', this.suppliersForm.value);
      this.onCancel()
      // Aquí iría la lógica para guardar el producto
    }
  }

  onCancel() {
    this.suppliersForm.reset();
    // O navegar de vuelta usando el router
  }

}
