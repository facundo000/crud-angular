import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../../services/brand.service';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.css']
})
export class AddBrandsComponent implements OnInit {

  brandForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private brandService: BrandService
  ) {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    
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
