import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/interfaces';
import { SupplierService } from '../../../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  public supplirs: Supplier[] = []

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.supplierService.getAllSuppliers()
    .subscribe( supplirs => this.supplirs = supplirs)
  }

  deleteSupplier(supplierId: string): void {
    Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if(result.isConfirmed) {
            this.supplierService.deleteCategoryById(supplierId).subscribe({
              next: () => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your product has been deleted.",
                  icon: "success"
                });
                this.supplirs = this.supplirs.filter(s => s.cod_prov !== supplierId);
              },
              error: (err:any) => {
                Swal.fire({
                  title: "Error!",
                  text: `Could not delete supplier, ${err}`,
                  icon: "error"
                });
              }
            })
          }
        })
  }
  
}
