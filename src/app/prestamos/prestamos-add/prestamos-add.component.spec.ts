import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosAddComponent } from './prestamos-add.component';

describe('PrestamosAddComponent', () => {
  let component: PrestamosAddComponent;
  let fixture: ComponentFixture<PrestamosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
