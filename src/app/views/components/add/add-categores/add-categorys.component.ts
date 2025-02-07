import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-categorys',
  templateUrl: './add-categorys.component.html',
  styleUrls: ['./add-categorys.component.css']
})
export class AddCategorysComponent implements OnInit {

  categoryForm: FormGroup;
  brands = ['Apple', 'Microsoft', 'Google', 'Samsung']; // Ejemplo, deberías obtenerlos de un servicio
  
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = { ...this.categoryForm.value }
      this.categoryService.addCategory(formData).subscribe({
        next: (response) => {
          console.log('rubro guardado', response)
          alert('saved successfully');
          this.onCancel();
        },
        error(err) {
          console.error('Error to add', err)
        }
      })
      this.onCancel()
      // Aquí iría la lógica para guardar el producto
    }
  }

  onCancel() {
    this.categoryForm.reset();
    // O navegar de vuelta usando el router
  }

}
