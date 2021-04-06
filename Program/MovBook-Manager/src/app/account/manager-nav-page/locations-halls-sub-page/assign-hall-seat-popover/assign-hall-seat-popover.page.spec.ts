import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignHallSeatPopoverPage } from './assign-hall-seat-popover.page';

describe('AssignHallSeatPopoverPage', () => {
  let component: AssignHallSeatPopoverPage;
  let fixture: ComponentFixture<AssignHallSeatPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignHallSeatPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignHallSeatPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
