import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CinemaHallsModalPage } from './cinema-halls-modal.page';

describe('CinemaHallsModalPage', () => {
  let component: CinemaHallsModalPage;
  let fixture: ComponentFixture<CinemaHallsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaHallsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CinemaHallsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
