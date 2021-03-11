import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchlistSubPagePage } from './watchlist-sub-page.page';

describe('WatchlistSubPagePage', () => {
  let component: WatchlistSubPagePage;
  let fixture: ComponentFixture<WatchlistSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
