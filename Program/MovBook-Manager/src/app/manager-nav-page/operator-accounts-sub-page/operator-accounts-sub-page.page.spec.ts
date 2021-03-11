import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperatorAccountsSubPagePage } from './operator-accounts-sub-page.page';

describe('OperatorAccountsSubPagePage', () => {
  let component: OperatorAccountsSubPagePage;
  let fixture: ComponentFixture<OperatorAccountsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorAccountsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorAccountsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
