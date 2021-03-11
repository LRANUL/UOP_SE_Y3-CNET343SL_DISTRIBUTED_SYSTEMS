import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardSubPagePage } from './dashboard-sub-page.page';

describe('DashboardSubPagePage', () => {
  let component: DashboardSubPagePage;
  let fixture: ComponentFixture<DashboardSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
