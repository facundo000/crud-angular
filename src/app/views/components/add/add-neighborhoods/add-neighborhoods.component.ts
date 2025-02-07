import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NeighborhoodService } from '../../../../services/neighborhood.service';

@Component({
  selector: 'app-add-neighborhoods',
  templateUrl: './add-neighborhoods.component.html',
  styleUrls: ['./add-neighborhoods.component.css']
})
export class AddNeighborhoodsComponent implements OnInit {

  neighborhoodForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private neighborhoodService: NeighborhoodService
  ) {
    this.neighborhoodForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Aquí deberías cargar las marcas y categorías reales desde un servicio
  }

  onSubmit() {
    if (this.neighborhoodForm.valid) {
      const formData = { ...this.neighborhoodForm.value }
      this.neighborhoodService.addNeighborhood(formData).subscribe({
        next: (response) => {
          console.log('Vecindario guardado', response);
          alert('Neighborhood added!');
          this.onCancel();
        },
        error(err) {
          console.error('Error to add', err)
        }
      })

    }
  }

  onCancel() {
    this.neighborhoodForm.reset();
    // O navegar de vuelta usando el router
  }

}
