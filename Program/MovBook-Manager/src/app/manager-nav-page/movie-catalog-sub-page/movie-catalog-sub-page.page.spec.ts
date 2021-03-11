import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieCatalogSubPagePage } from './movie-catalog-sub-page.page';

describe('MovieCatalogSubPagePage', () => {
  let component: MovieCatalogSubPagePage;
  let fixture: ComponentFixture<MovieCatalogSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCatalogSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCatalogSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
