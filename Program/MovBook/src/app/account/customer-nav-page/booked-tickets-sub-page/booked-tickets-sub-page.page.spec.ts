import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookedTicketsSubPagePage } from './booked-tickets-sub-page.page';

describe('BookedTicketsSubPagePage', () => {
  let component: BookedTicketsSubPagePage;
  let fixture: ComponentFixture<BookedTicketsSubPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedTicketsSubPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookedTicketsSubPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
