import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMetodoPagoComponent } from './editar-metodo-pago.component';

describe('EditarMetodoPagoComponent', () => {
  let component: EditarMetodoPagoComponent;
  let fixture: ComponentFixture<EditarMetodoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMetodoPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
