import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeSubPagePage } from './home-sub-page.page';

describe('HomeSubPagePage', () => {
  let component: HomeSubPagePage;
  let fixture: ComponentFixture<HomeSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
