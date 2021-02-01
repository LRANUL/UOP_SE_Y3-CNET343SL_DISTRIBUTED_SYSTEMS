import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Booking1SubPagePage } from './booking1-sub-page.page';

describe('Booking1SubPagePage', () => {
  let component: Booking1SubPagePage;
  let fixture: ComponentFixture<Booking1SubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Booking1SubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Booking1SubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
