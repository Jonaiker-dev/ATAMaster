import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStorageComponent } from './modal-storage.component';

describe('ModalStorageComponent', () => {
  let component: ModalStorageComponent;
  let fixture: ComponentFixture<ModalStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalStorageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
