import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrowseUpcomingMoviesSubPagePage } from './browse-upcoming-movies-sub-page.page';

describe('BrowseUpcomingMoviesSubPagePage', () => {
  let component: BrowseUpcomingMoviesSubPagePage;
  let fixture: ComponentFixture<BrowseUpcomingMoviesSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseUpcomingMoviesSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseUpcomingMoviesSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
