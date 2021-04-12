import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD:Program/MovBook-Operator/src/app/operator-nav-page/manage-stock-sub-page/manage-stock-sub-page.page.spec.ts
import { ManageStockSubPagePage } from './manage-stock-sub-page.page';

describe('ManageStockSubPagePage', () => {
  let component: ManageStockSubPagePage;
  let fixture: ComponentFixture<ManageStockSubPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStockSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageStockSubPagePage);
=======
import { HeaderComponentComponent } from './header-component.component';

describe('HeaderComponentComponent', () => {
  let component: HeaderComponentComponent;
  let fixture: ComponentFixture<HeaderComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponentComponent);
>>>>>>> 2de948fffafbac12c75ace1e97b5b812734206ec:Program/MovBook-Customer/src/app/header-component/header-component.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
