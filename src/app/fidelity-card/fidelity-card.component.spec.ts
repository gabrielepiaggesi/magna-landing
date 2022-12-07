import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelityCardComponent } from './fidelity-card.component';

describe('FidelityCardComponent', () => {
  let component: FidelityCardComponent;
  let fixture: ComponentFixture<FidelityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FidelityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FidelityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
