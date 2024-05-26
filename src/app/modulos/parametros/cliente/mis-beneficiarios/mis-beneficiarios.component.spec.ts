import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisBeneficiariosComponent } from './mis-beneficiarios.component';

describe('MisBeneficiariosComponent', () => {
  let component: MisBeneficiariosComponent;
  let fixture: ComponentFixture<MisBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisBeneficiariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
