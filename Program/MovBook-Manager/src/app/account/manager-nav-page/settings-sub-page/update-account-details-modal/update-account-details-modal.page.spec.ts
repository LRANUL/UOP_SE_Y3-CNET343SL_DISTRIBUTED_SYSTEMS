import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateAccountDetailsModalPage } from './update-account-details-modal.page';

describe('UpdateAccountDetailsModalPage', () => {
  let component: UpdateAccountDetailsModalPage;
  let fixture: ComponentFixture<UpdateAccountDetailsModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccountDetailsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateAccountDetailsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
