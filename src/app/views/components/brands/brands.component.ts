import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/interfaces';
import { BrandService } from '../../../services/brand.service';

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
}
