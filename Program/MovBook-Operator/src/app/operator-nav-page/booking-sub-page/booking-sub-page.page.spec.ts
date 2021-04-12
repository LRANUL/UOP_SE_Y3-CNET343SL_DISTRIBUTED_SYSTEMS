import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingSubPagePage } from './booking-sub-page.page';

describe('BookingSubPagePage', () => {
  let component: BookingSubPagePage;
  let fixture: ComponentFixture<BookingSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
