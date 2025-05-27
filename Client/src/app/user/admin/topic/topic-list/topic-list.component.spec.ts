import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicListComponent } from './topic-list.component';

describe('TopicComponent', () => {
  let component: AdminTopicListComponent;
  let fixture: ComponentFixture<AdminTopicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTopicListComponent],
    });
    fixture = TestBed.createComponent(AdminTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
