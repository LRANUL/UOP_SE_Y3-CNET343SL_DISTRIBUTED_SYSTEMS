import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperatorNavPagePage } from './operator-nav-page.page';

describe('OperatorNavPagePage', () => {
  let component: OperatorNavPagePage;
  let fixture: ComponentFixture<OperatorNavPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorNavPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorNavPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
