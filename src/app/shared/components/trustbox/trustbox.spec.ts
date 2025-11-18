import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trustbox } from './trustbox';

describe('Trustbox', () => {
  let component: Trustbox;
  let fixture: ComponentFixture<Trustbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trustbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trustbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
