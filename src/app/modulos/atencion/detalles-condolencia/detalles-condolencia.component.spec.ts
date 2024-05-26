import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCondolenciaComponent } from './detalles-condolencia.component';

describe('DetallesCondolenciaComponent', () => {
  let component: DetallesCondolenciaComponent;
  let fixture: ComponentFixture<DetallesCondolenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesCondolenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesCondolenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
