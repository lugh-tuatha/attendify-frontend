import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSkeleton } from './report-skeleton';

describe('ReportSkeleton', () => {
  let component: ReportSkeleton;
  let fixture: ComponentFixture<ReportSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
