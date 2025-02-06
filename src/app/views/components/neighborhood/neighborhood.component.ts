import { Component, OnInit } from '@angular/core';
import { Neighborhood } from 'src/app/interfaces';
import { NeighborhoodService } from '../../../services/neighborhood.service';

@Component({
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.css']
})
export class NeighborhoodComponent implements OnInit{
  
  public neighborhoods: Neighborhood[] = []

  constructor(private neighborhoodService: NeighborhoodService) {}
  
  ngOnInit(): void {
    this.neighborhoodService.getAllSuppliers().subscribe( neighborhoods => this.neighborhoods = neighborhoods )
  }

}
