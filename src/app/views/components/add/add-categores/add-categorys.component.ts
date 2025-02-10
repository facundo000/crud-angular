import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-categorys',
  templateUrl: './add-categorys.component.html',
  styleUrls: ['./add-categorys.component.css']
})
export class AddCategorysComponent implements OnInit {

  categoryForm: FormGroup;
  brands = ['Apple', 'Microsoft', 'Google', 'Samsung']; // Ejemplo, deberías obtenerlos de un servicio
  categoryId: string | null = null;
  isEditMode = false;
  
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEditMode = !!this.categoryId;

    if(this.isEditMode) {
      this.activatedRoute.params.pipe(
        switchMap( ({id}) => this.categoryService.getCategoryById(id) )
      ).subscribe(
        category => {
          if(!category) {
            return this.router.navigateByUrl('/')
          }

          const formData = {
            name: category.name
          }

          this.categoryForm.reset(formData);
          return
        }
      )
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let formData = { ...this.categoryForm.value }

      if(this.isEditMode){
        console.log(formData);
        this.categoryService.updateCategory(this.categoryId!, formData)
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.handleError(err)
        })
      } else {
        this.categoryService.addCategory(formData).subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.handleError(err)          
        })
      }

    }
  }

  private handleSuccess(): void {
    alert('Success');
    this.onCancel()
  }

  private handleError(err: any): void {
    console.error('Error',err);
  }

  onCancel() {
    this.categoryForm.reset();
    // O navegar de vuelta usando el router
  }

}
