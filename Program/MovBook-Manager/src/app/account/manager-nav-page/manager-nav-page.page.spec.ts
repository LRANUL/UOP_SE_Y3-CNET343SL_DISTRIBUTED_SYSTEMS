import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerNavPagePage } from './manager-nav-page.page';

describe('ManagerNavPagePage', () => {
  let component: ManagerNavPagePage;
  let fixture: ComponentFixture<ManagerNavPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerNavPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerNavPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
