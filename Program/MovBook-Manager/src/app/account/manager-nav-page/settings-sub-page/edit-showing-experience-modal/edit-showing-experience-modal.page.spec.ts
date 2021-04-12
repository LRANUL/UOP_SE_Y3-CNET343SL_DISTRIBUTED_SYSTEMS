import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditShowingExperienceModalPage } from './edit-showing-experience-modal.page';

describe('EditShowingExperienceModalPage', () => {
  let component: EditShowingExperienceModalPage;
  let fixture: ComponentFixture<EditShowingExperienceModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShowingExperienceModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditShowingExperienceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
