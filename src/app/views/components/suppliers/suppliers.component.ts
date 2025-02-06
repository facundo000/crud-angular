import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/interfaces';
import { SupplierService } from '../../../services/supplier.service';

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
  
}
