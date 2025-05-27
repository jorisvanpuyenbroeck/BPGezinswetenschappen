import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectFormComponent } from './project-form.component';


describe('ProjectFormComponent', () => {
  let component: AdminProjectFormComponent;
  let fixture: ComponentFixture<AdminProjectFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProjectFormComponent],
    });
    fixture = TestBed.createComponent(AdminProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
