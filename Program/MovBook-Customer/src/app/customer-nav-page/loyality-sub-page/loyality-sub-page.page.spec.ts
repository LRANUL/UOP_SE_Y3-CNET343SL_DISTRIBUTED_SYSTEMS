import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoyalitySubPagePage } from './loyality-sub-page.page';

describe('LoyalitySubPagePage', () => {
  let component: LoyalitySubPagePage;
  let fixture: ComponentFixture<LoyalitySubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitySubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoyalitySubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
