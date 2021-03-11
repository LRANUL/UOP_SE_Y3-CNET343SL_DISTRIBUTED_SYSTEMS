import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministratorNavPagePage } from './administrator-nav-page.page';

describe('AdministratorNavPagePage', () => {
  let component: AdministratorNavPagePage;
  let fixture: ComponentFixture<AdministratorNavPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorNavPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratorNavPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
