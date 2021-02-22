import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLocationModalPage } from './add-location-modal.page';

describe('AddLocationModalPage', () => {
  let component: AddLocationModalPage;
  let fixture: ComponentFixture<AddLocationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLocationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
