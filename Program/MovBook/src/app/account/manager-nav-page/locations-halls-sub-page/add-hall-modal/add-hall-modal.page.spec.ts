import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddHallModalPage } from './add-hall-modal.page';

describe('AddHallModalPage', () => {
  let component: AddHallModalPage;
  let fixture: ComponentFixture<AddHallModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHallModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHallModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
