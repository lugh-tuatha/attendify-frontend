import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceCheckIn } from './face-check-in';

describe('FaceCheckIn', () => {
  let component: FaceCheckIn;
  let fixture: ComponentFixture<FaceCheckIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaceCheckIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaceCheckIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
