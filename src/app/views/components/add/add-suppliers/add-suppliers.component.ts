import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, MinLengthValidator, MinValidator, Validators } from '@angular/forms';
import { NeighborhoodService } from '../../../../services/neighborhood.service';
import { Neighborhood } from 'src/app/interfaces';
import { SupplierService } from '../../../../services/supplier.service';

@Component({
  selector: 'app-add-suppliers',
  templateUrl: './add-suppliers.component.html',
  styleUrls: ['./add-suppliers.component.css']
})
export class AddSuppliersComponent implements OnInit {

  suppliersForm: FormGroup;
  public neighborhoods: Neighborhood[] = []
  //neighborhood = ['Talanga', 'av rokefort', 'san javier', 'Comechingon']; // Ejemplo
  
  constructor(
    private fb: FormBuilder,
    private neighborhoodService: NeighborhoodService,
    private supplierService: SupplierService
  ) {
    this.suppliersForm = this.fb.group({
      name: ['', Validators.required],
      direction: ['', Validators.required],
      phone: ['', Validators.required],
      mail: ['', { nonNullable: true } ],
      id_neighborhood: ['', Validators.required,],
    });
  }
  ngOnInit(): void {
    this.neighborhoodService.getAllNeighborhood().subscribe( neighborhoods => this.neighborhoods = neighborhoods )
  }

  onSubmit() {
    if (this.suppliersForm.valid) {
      
      const formData = { ...this.suppliersForm.value }

      this.supplierService.addSupplier(formData).subscribe({
        next: (response) => {
          console.log('proveedor Guardado!', response);
          alert('Supplier added');
          this.onCancel()
        }
      })
      this.onCancel()
      // Aquí iría la lógica para guardar el producto
    }
  }

  onCancel() {
    this.suppliersForm.reset();
    // O navegar de vuelta usando el router
  }

}
