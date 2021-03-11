import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationAndTimeSubPagePage } from './location-and-time-sub-page.page';

describe('LocationAndTimeSubPagePage', () => {
  let component: LocationAndTimeSubPagePage;
  let fixture: ComponentFixture<LocationAndTimeSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAndTimeSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationAndTimeSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
