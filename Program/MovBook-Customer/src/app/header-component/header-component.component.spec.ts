import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD:Program/MovBook-Operator/src/app/operator-nav-page/support-sub-page/support-sub-page.page.spec.ts
import { SupportSubPagePage } from './support-sub-page.page';

describe('SupportSubPagePage', () => {
  let component: SupportSubPagePage;
  let fixture: ComponentFixture<SupportSubPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportSubPagePage);
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
