import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileSubPagePage } from './profile-sub-page.page';

describe('ProfileSubPagePage', () => {
  let component: ProfileSubPagePage;
  let fixture: ComponentFixture<ProfileSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
