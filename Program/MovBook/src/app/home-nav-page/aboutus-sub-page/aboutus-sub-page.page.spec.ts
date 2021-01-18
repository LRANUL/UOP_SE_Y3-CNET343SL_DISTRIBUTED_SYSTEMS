import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutusSubPagePage } from './aboutus-sub-page.page';

describe('AboutusSubPagePage', () => {
  let component: AboutusSubPagePage;
  let fixture: ComponentFixture<AboutusSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutusSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
