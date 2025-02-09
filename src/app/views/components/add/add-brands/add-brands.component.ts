import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.css']
})
export class AddBrandsComponent implements OnInit {

  brandForm: FormGroup;

  brandId: string | null = null;
  isEditMode = false;
  
  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.brandId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEditMode = !!this.brandId;

    if(this.isEditMode) {
      this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.brandService.getBrandById(id) ),       
      ).subscribe(
        brand => {
          if(!brand) {
            return this.router.navigateByUrl('/');
          }
        }
      )
    }
  }

  onSubmit() {
    if (this.brandForm.valid) {
      
      const formData = { ...this.brandForm.value }
      this.brandService.addBrand(formData)
      .subscribe({
        next: (response) => {
          console.log('Marca Guardada!', response);
          alert('Saved successfully');
          this.onCancel()
        },
        error: (err) => {
          console.error('Error to add', err)
        }
      })
      this.onCancel()
    }
  }

  onCancel() {
    this.brandForm.reset();
  }

}
