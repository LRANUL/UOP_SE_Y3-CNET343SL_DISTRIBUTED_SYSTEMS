import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieCatalogTypesPopoverPage } from './movie-catalog-types-popover.page';

describe('MovieCatalogTypesPopoverPage', () => {
  let component: MovieCatalogTypesPopoverPage;
  let fixture: ComponentFixture<MovieCatalogTypesPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCatalogTypesPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCatalogTypesPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
