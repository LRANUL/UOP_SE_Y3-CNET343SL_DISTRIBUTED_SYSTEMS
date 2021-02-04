import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationsHallsSubPagePage } from './locations-halls-sub-page.page';

describe('LocationsHallsSubPagePage', () => {
  let component: LocationsHallsSubPagePage;
  let fixture: ComponentFixture<LocationsHallsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsHallsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationsHallsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
