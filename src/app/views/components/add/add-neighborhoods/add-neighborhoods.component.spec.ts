import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNeighborhoodsComponent } from './add-neighborhoods.component';

describe('AddNeighborhoodsComponent', () => {
  let component: AddNeighborhoodsComponent;
  let fixture: ComponentFixture<AddNeighborhoodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNeighborhoodsComponent]
    });
    fixture = TestBed.createComponent(AddNeighborhoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
