import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditManagerPage } from './edit-manager.page';

describe('EditManagerPage', () => {
  let component: EditManagerPage;
  let fixture: ComponentFixture<EditManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
