import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPresentationdayFormComponent } from './presentationday-form.component';

describe('AdminPresentationdayFormComponent', () => {
  let component: AdminPresentationdayFormComponent;
  let fixture: ComponentFixture<AdminPresentationdayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPresentationdayFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPresentationdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
