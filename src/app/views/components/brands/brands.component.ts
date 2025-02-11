import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/interfaces';
import { BrandService } from '../../../services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  public brands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brandService.getAllBrand().subscribe( brands => this.brands = brands)
  }

  deleteBrand(brandId: string): void {
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
            this.brandService.deleteBrandById(brandId).subscribe({
              next: () => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your brand has been deleted.",
                  icon: "success"
                });
                this.brands = this.brands.filter(b => b.id !== brandId)
              },
              error: (err:any) => {
                Swal.fire({
                  title: "Error!",
                  text: `Could not delete product, ${err}`,
                  icon: "error"
                });
              }
            })
          }
    });
  }
}
