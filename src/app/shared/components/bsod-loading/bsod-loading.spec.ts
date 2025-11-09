import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsodLoading } from './bsod-loading';

describe('BsodLoading', () => {
  let component: BsodLoading;
  let fixture: ComponentFixture<BsodLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BsodLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BsodLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
