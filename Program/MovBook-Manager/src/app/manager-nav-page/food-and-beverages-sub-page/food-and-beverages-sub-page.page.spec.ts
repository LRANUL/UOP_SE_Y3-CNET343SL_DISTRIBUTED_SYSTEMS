import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodAndBeveragesSubPagePage } from './food-and-beverages-sub-page.page';

describe('FoodAndBeveragesSubPagePage', () => {
  let component: FoodAndBeveragesSubPagePage;
  let fixture: ComponentFixture<FoodAndBeveragesSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodAndBeveragesSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodAndBeveragesSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
