import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipItem } from './vip-item';

describe('VipItem', () => {
  let component: VipItem;
  let fixture: ComponentFixture<VipItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VipItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
