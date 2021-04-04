import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageNotificationsSubPagePage } from './manage-notifications-sub-page.page';

describe('ManageNotificationsSubPagePage', () => {
  let component: ManageNotificationsSubPagePage;
  let fixture: ComponentFixture<ManageNotificationsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNotificationsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageNotificationsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
