import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewShowingExperienceModalPage } from './add-new-showing-experience-modal.page';

describe('AddNewShowingExperienceModalPage', () => {
  let component: AddNewShowingExperienceModalPage;
  let fixture: ComponentFixture<AddNewShowingExperienceModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewShowingExperienceModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewShowingExperienceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
