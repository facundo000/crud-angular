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

          const formData = {
            name: brand.name
          }

          this.brandForm.patchValue( formData );
          return;
        }
      )
    }
  }

  onSubmit() {
    if (this.brandForm.valid) {
      let formData = { ...this.brandForm.value }

      if(this.isEditMode) {
        console.log(formData);
        this.brandService.updateBrand(this.brandId!, formData)
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.handleError(err)
        })
      } else {
        this.brandService.addBrand(formData)
        .subscribe({
          next: () => {
            this.handleSuccess()
          },
          error: (err) => {
            this.handleError(err)
          }
        })
      }
      
    }
  }

  private handleSuccess(): void {
    alert(`Save Successfully`);
    this.onCancel();
  }

  private handleError(err: any): void {
    console.error('Error', err);
  }

  onCancel() {
    this.brandForm.reset();
  }

}
