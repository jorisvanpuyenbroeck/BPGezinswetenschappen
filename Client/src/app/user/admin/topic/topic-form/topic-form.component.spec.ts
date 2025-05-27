import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicFormComponent } from './topic-form.component';

describe('AdminTopicFormComponent', () => {
  let component: AdminTopicFormComponent;
  let fixture: ComponentFixture<AdminTopicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTopicFormComponent]
    });
    fixture = TestBed.createComponent(AdminTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
