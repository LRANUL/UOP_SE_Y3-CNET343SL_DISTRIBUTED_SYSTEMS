import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyEmailAddressPopoverPage } from './verify-email-address-popover.page';

describe('VerifyEmailAddressPopoverPage', () => {
  let component: VerifyEmailAddressPopoverPage;
  let fixture: ComponentFixture<VerifyEmailAddressPopoverPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailAddressPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyEmailAddressPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
