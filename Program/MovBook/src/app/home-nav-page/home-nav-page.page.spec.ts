import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeNavPagePage } from './home-nav-page.page';

describe('HomeNavPagePage', () => {
  let component: HomeNavPagePage;
  let fixture: ComponentFixture<HomeNavPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNavPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeNavPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
