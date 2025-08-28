import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUbicacionComponent } from './formulario-ubicacion.component';

describe('FormularioUbicacionComponent', () => {
  let component: FormularioUbicacionComponent;
  let fixture: ComponentFixture<FormularioUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioUbicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
