import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectModelDialog } from './select-model-dialog';

describe('SelectModelDialog', () => {
  let component: SelectModelDialog;
  let fixture: ComponentFixture<SelectModelDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectModelDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectModelDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
