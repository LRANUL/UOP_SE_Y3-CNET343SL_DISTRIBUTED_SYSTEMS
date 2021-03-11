import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerNavPagePage } from './customer-nav-page.page';

describe('CustomerNavPagePage', () => {
  let component: CustomerNavPagePage;
  let fixture: ComponentFixture<CustomerNavPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNavPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerNavPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
