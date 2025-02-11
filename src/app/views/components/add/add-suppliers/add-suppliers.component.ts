import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, MinLengthValidator, MinValidator, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
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
  
  supplierId: string | null = null;
  isEditMode:boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private neighborhoodService: NeighborhoodService,
    private supplierService: SupplierService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.suppliersForm = this.fb.group({
      name: ['', Validators.required],
      direction: ['', Validators.required],
      phone: ['', Validators.required],
      mail: [{ nonNullable: true } ],
      id_neighborhood: ['', Validators.required,],
    });
  }
  ngOnInit(): void {
    this.supplierId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isEditMode = !!this.supplierId;
    
    this.neighborhoodService.getAllNeighborhood()
    .subscribe( neighborhoods => this.neighborhoods = neighborhoods )    

    if(this.isEditMode) {
      this.activatedRoute.params
      .pipe( 
        switchMap( ({id}) => this.supplierService.getSupplierById(id) )
      ).subscribe( supplier => {
        if(!supplier) {
          this.router.navigateByUrl('/')
        }
        
        const phoneInt: number = parseInt(supplier?.phone ?? '0') || 0;
                
        let formData = {
          name: supplier?.name,
          direction: supplier?.direction,
          phone: phoneInt,
          mail: supplier?.mail,
          id_neighborhood: supplier?.id_neighborhood ? supplier.id_neighborhood.id : null
        }

        this.suppliersForm.reset(formData)
        return;
      })
    }

  }

  onSubmit() {
    if (this.suppliersForm.valid) {
      
      let formData = { ...this.suppliersForm.value }
      console.log(formData)
      if(this.isEditMode) {
        this.supplierService.updateSupplier(this.supplierId!, formData)
        .subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.handleError(err)
        })
      } else {
        this.supplierService.addSupplier(formData).subscribe({
          next: () => this.handleSuccess(),
          error: (err) => this.handleError(err)
        })
      }

    }
  }

  private handleSuccess(): void {
    alert('Saved successfully');
    this.onCancel();
  }

  private handleError(err: any): void {
    console.error('Error:', err);
    // Mostrar mensaje de error al usuario
  }

  onCancel() {
    this.suppliersForm.reset();
    // O navegar de vuelta usando el router
  }

}
