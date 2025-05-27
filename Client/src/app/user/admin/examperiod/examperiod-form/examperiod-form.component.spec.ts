import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamperiodFormComponent } from './examperiod-form.component';

describe('ExamperiodFormComponent', () => {
  let component: ExamperiodFormComponent;
  let fixture: ComponentFixture<ExamperiodFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamperiodFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamperiodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
