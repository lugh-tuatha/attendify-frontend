import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipHeader } from './vip-header';

describe('VipHeader', () => {
  let component: VipHeader;
  let fixture: ComponentFixture<VipHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VipHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
