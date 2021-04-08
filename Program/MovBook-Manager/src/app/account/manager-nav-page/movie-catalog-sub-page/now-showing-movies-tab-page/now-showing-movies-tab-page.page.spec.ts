import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NowShowingMoviesTabPagePage } from './now-showing-movies-tab-page.page';

describe('NowShowingMoviesTabPagePage', () => {
  let component: NowShowingMoviesTabPagePage;
  let fixture: ComponentFixture<NowShowingMoviesTabPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NowShowingMoviesTabPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NowShowingMoviesTabPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
