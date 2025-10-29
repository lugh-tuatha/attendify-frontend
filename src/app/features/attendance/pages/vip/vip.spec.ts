import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vip } from './vip';

describe('Vip', () => {
  let component: Vip;
  let fixture: ComponentFixture<Vip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
