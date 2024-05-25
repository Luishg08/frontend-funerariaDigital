import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarServicioFunerarioComponent } from './solicitar-servicio-funerario.component';

describe('SolicitarServicioFunerarioComponent', () => {
  let component: SolicitarServicioFunerarioComponent;
  let fixture: ComponentFixture<SolicitarServicioFunerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarServicioFunerarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarServicioFunerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
