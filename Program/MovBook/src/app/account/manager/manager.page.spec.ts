import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerPage } from './manager.page';

describe('ManagerPage', () => {
  let component: ManagerPage;
  let fixture: ComponentFixture<ManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
