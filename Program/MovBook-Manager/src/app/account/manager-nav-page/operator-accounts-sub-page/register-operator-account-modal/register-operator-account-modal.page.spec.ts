import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterOperatorAccountModalPage } from './register-operator-account-modal.page';

describe('RegisterOperatorAccountModalPage', () => {
  let component: RegisterOperatorAccountModalPage;
  let fixture: ComponentFixture<RegisterOperatorAccountModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOperatorAccountModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterOperatorAccountModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
