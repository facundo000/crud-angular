import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NeighborhoodService } from '../../../../services/neighborhood.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-neighborhoods',
  templateUrl: './add-neighborhoods.component.html',
  styleUrls: ['./add-neighborhoods.component.css']
})
export class AddNeighborhoodsComponent implements OnInit {

  neighborhoodForm: FormGroup;
  isEditMode:boolean = false;
  neighborhoodId: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private neighborhoodService: NeighborhoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.neighborhoodForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.neighborhoodId = this.activatedRoute.snapshot.paramMap.get('id')
    this.isEditMode = !!this.neighborhoodId;

    if(this.isEditMode) {
      this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.neighborhoodService.getNeighborhoodById(id) )
      ).subscribe(
        neighborhood => {
          if(!neighborhood) {
            this.router.navigateByUrl('/');
          }

          const formData = {
            name: neighborhood.name
          }

          this.neighborhoodForm.reset(formData)
          return;
        }
      )
    }
  }

  onSubmit() {
    if (this.neighborhoodForm.valid) {
      const formData = this.neighborhoodForm.value;

      if(this.isEditMode){
        this.neighborhoodService.updateNeighborhood(this.neighborhoodId!, formData).subscribe({
          next: () => this.handleSucces(),
          error: (err) => this.handleError(err)
        })
      } else {
        this.neighborhoodService.addNeighborhood(formData).subscribe({
          next: () => this.handleSucces(),
          error: (err) => this.handleError(err)
        })
      }


    }
  }

  handleSucces(): void {
    alert('neighborhood Success!');
    this.onCancel();
  }

  handleError(err: void): void {
    console.error('Error!', err);
  }

  onCancel() {
    this.neighborhoodForm.reset();
    // O navegar de vuelta usando el router
  }

}
