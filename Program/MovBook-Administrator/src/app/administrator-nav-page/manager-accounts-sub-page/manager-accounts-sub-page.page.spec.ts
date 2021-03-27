import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerAccountsSubPagePage } from './manager-accounts-sub-page.page';

describe('ManagerAccountsSubPagePage', () => {
  let component: ManagerAccountsSubPagePage;
  let fixture: ComponentFixture<ManagerAccountsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAccountsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerAccountsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
