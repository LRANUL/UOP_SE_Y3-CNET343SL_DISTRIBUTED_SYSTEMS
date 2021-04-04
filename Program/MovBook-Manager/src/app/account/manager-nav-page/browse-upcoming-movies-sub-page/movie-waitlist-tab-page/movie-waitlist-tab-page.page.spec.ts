import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieWaitlistTabPagePage } from './movie-waitlist-tab-page.page';

describe('MovieWaitlistTabPagePage', () => {
  let component: MovieWaitlistTabPagePage;
  let fixture: ComponentFixture<MovieWaitlistTabPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieWaitlistTabPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWaitlistTabPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
