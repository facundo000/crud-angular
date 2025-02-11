import { Component, OnInit } from '@angular/core';
import { Neighborhood } from 'src/app/interfaces';
import { NeighborhoodService } from '../../../services/neighborhood.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.css']
})
export class NeighborhoodComponent implements OnInit{
  
  public neighborhoods: Neighborhood[] = []

  constructor(private neighborhoodService: NeighborhoodService) {}
  
  ngOnInit(): void {
    this.neighborhoodService.getAllNeighborhood().subscribe( neighborhoods => this.neighborhoods = neighborhoods )
  }

  deleteNeighborhood(neighborhoodId: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.neighborhoodService.deleteNeighborhoodById(neighborhoodId).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.neighborhoods = this.neighborhoods.filter(n => n.id !== neighborhoodId)
          },
          error: (err:any) => {
            Swal.fire({
              title: "Error!",
              text: `Could not delete neighborhood,${err}`,
              icon: "error"
            });
          }
        })
        
      }
    });
  }

}
