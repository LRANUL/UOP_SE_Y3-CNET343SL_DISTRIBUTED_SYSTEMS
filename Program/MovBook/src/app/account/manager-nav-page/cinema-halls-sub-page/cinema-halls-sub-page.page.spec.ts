import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CinemaHallsSubPagePage } from './cinema-halls-sub-page.page';

describe('CinemaHallsSubPagePage', () => {
  let component: CinemaHallsSubPagePage;
  let fixture: ComponentFixture<CinemaHallsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaHallsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CinemaHallsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
