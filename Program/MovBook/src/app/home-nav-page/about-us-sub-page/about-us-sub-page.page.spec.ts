import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutUsSubPagePage } from './about-us-sub-page.page';

describe('AboutUsSubPagePage', () => {
  let component: AboutUsSubPagePage;
  let fixture: ComponentFixture<AboutUsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
