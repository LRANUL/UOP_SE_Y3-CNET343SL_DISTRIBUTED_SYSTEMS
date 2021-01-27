import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingSubPagePage } from './setting-sub-page.page';

describe('SettingSubPagePage', () => {
  let component: SettingSubPagePage;
  let fixture: ComponentFixture<SettingSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
