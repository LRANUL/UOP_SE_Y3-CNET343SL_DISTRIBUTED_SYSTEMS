import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoyalityInformationSubPagePage } from './loyality-information-sub-page.page';

describe('LoyalityInformationSubPagePage', () => {
  let component: LoyalityInformationSubPagePage;
  let fixture: ComponentFixture<LoyalityInformationSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityInformationSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoyalityInformationSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
