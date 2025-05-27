import { ComponentFixture, TestBed } from '@angular/core/testing';

import {StudentTopicListComponent } from './topic-list.component';

describe('StudentTopicListComponent', () => {
  let component: StudentTopicListComponent;
  let fixture: ComponentFixture<StudentTopicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTopicListComponent],
    });
    fixture = TestBed.createComponent(StudentTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
