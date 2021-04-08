import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpcomingMoviesTabPagePage } from './upcoming-movies-tab-page.page';

describe('UpcomingMoviesTabPagePage', () => {
  let component: UpcomingMoviesTabPagePage;
  let fixture: ComponentFixture<UpcomingMoviesTabPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingMoviesTabPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingMoviesTabPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
