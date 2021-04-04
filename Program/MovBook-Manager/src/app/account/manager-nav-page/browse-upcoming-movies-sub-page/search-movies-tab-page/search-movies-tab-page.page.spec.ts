import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchMoviesTabPagePage } from './search-movies-tab-page.page';

describe('SearchMoviesTabPagePage', () => {
  let component: SearchMoviesTabPagePage;
  let fixture: ComponentFixture<SearchMoviesTabPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMoviesTabPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMoviesTabPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
