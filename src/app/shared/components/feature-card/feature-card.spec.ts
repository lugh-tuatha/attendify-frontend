import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCard } from './feature-card';

describe('FeatureCard', () => {
  let component: FeatureCard;
  let fixture: ComponentFixture<FeatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
