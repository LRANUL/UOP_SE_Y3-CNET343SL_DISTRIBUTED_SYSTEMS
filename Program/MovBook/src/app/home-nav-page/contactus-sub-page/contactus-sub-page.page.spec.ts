import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactusSubPagePage } from './contactus-sub-page.page';

describe('ContactusSubPagePage', () => {
  let component: ContactusSubPagePage;
  let fixture: ComponentFixture<ContactusSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactusSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
