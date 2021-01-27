import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactUsSubPagePage } from './contact-us-sub-page.page';

describe('ContactUsSubPagePage', () => {
  let component: ContactUsSubPagePage;
  let fixture: ComponentFixture<ContactUsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
