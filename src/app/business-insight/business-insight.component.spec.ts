import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInsightComponent } from './business-insight.component';

describe('BusinessInsightComponent', () => {
  let component: BusinessInsightComponent;
  let fixture: ComponentFixture<BusinessInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessInsightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
