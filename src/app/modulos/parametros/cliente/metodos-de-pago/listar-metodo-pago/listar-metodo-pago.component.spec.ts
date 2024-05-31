import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMetodoPagoComponent } from './listar-metodo-pago.component';

describe('ListarMetodoPagoComponent', () => {
  let component: ListarMetodoPagoComponent;
  let fixture: ComponentFixture<ListarMetodoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarMetodoPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarMetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
