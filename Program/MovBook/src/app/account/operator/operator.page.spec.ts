import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperatorPage } from './operator.page';

describe('OperatorPage', () => {
  let component: OperatorPage;
  let fixture: ComponentFixture<OperatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
