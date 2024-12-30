import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNewPasswordDialogComponent } from './set-new-password-dialog.component';

describe('SetNewPasswordDialogComponent', () => {
  let component: SetNewPasswordDialogComponent;
  let fixture: ComponentFixture<SetNewPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetNewPasswordDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetNewPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
