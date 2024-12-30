import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationDialogComponent } from './otp-verification-dialog.component';

describe('OtpVerificationDialogComponent', () => {
  let component: OtpVerificationDialogComponent;
  let fixture: ComponentFixture<OtpVerificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpVerificationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
