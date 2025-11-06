import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModal } from './error-modal';

describe('ErrorModal', () => {
  let component: ErrorModal;
  let fixture: ComponentFixture<ErrorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
