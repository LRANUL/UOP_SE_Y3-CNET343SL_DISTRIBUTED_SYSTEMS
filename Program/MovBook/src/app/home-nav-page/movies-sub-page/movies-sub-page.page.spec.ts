import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoviesSubPagePage } from './movies-sub-page.page';

describe('MoviesSubPagePage', () => {
  let component: MoviesSubPagePage;
  let fixture: ComponentFixture<MoviesSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
