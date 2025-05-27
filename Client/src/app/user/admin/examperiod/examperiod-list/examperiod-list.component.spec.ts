import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamperiodListComponent } from './examperiod-list.component';

describe('ExamperiodListComponent', () => {
  let component: ExamperiodListComponent;
  let fixture: ComponentFixture<ExamperiodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamperiodListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamperiodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
