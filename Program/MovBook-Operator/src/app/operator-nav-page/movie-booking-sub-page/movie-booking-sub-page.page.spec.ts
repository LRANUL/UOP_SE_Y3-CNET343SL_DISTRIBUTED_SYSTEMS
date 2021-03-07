import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieBookingSubPagePage } from './movie-booking-sub-page.page';

describe('MovieBookingSubPagePage', () => {
  let component: MovieBookingSubPagePage;
  let fixture: ComponentFixture<MovieBookingSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBookingSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieBookingSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
