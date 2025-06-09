import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminYearFormComponent } from './year-form.component';

describe('AdminYearFormComponent', () => {
  let component: AdminYearFormComponent;
  let fixture: ComponentFixture<AdminYearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminYearFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminYearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
