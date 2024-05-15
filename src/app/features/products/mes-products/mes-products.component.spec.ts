import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesProductsComponent } from './mes-products.component';

describe('MesProductsComponent', () => {
  let component: MesProductsComponent;
  let fixture: ComponentFixture<MesProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesProductsComponent]
    });
    fixture = TestBed.createComponent(MesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
