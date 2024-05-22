import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutanoencontradaComponent } from './rutanoencontrada.component';

describe('RutanoencontradaComponent', () => {
  let component: RutanoencontradaComponent;
  let fixture: ComponentFixture<RutanoencontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutanoencontradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutanoencontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
