import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAdminPage } from './edit-admin.page';

describe('EditAdminPage', () => {
  let component: EditAdminPage;
  let fixture: ComponentFixture<EditAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
