import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTopicFormComponent } from './topic-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TopicService } from '../../../../shared/services/topic.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../shared/shared.module';
import { of, throwError } from 'rxjs';
import { Topic } from '../../../../shared/models/topic';

describe('AdminTopicFormComponent', () => {
  let component: AdminTopicFormComponent;
  let fixture: ComponentFixture<AdminTopicFormComponent>;
  let topicService: jasmine.SpyObj<TopicService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const mockTopic: Topic = {
    topicId: 1,
    name: 'Test Topic',
    description: 'Test Description',
  };

  beforeEach(async () => {
    const topicServiceSpy = jasmine.createSpyObj('TopicService', [
      'getTopicById',
      'putTopic',
      'postTopic',
    ]);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'showSuccess',
      'showError',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AdminTopicFormComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, SharedModule],
      providers: [
        FormBuilder,
        { provide: TopicService, useValue: topicServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
      ],
    }).compileComponents();

    topicService = TestBed.inject(TopicService) as jasmine.SpyObj<TopicService>;
    notificationService = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.topicForm.get('name')?.value).toBe('');
    expect(component.topicForm.get('description')?.value).toBe('');
  });

  it('should load topic when in edit mode', () => {
    topicService.getTopicById.and.returnValue(of(mockTopic));
    component.isEdit = true;
    component['loadTopic'](1);

    expect(component.topic).toEqual(mockTopic);
    expect(component.topicForm.get('name')?.value).toBe(mockTopic.name);
    expect(component.topicForm.get('description')?.value).toBe(
      mockTopic.description
    );
  });

  it('should handle error when loading topic fails', () => {
    const error = new Error('Test error');
    topicService.getTopicById.and.returnValue(throwError(() => error));
    component.isEdit = true;
    component['loadTopic'](1);

    expect(notificationService.showError).toHaveBeenCalledWith(
      'Error loading topic: Test error'
    );
  });

  it('should create new topic when form is submitted in create mode', () => {
    const newTopic = { ...mockTopic };
    topicService.postTopic.and.returnValue(of(newTopic));

    component.topicForm.patchValue({
      name: newTopic.name,
      description: newTopic.description,
    });

    component.onFormSubmit(component.topicForm.value);

    expect(topicService.postTopic).toHaveBeenCalled();
    expect(notificationService.showSuccess).toHaveBeenCalledWith(
      'Topic successfully created'
    );
  });

  it('should update topic when form is submitted in edit mode', () => {
    const updatedTopic = { ...mockTopic, name: 'Updated Topic' };
    topicService.putTopic.and.returnValue(of(updatedTopic));

    component.isEdit = true;
    component.topic = mockTopic;
    component.topicForm.patchValue({
      name: updatedTopic.name,
      description: updatedTopic.description,
    });

    component.onFormSubmit(component.topicForm.value);

    expect(topicService.putTopic).toHaveBeenCalled();
    expect(notificationService.showSuccess).toHaveBeenCalledWith(
      'Topic successfully updated'
    );
  });

  it('should handle error when saving topic fails', () => {
    const error = new Error('Test error');
    topicService.postTopic.and.returnValue(throwError(() => error));

    component.topicForm.patchValue({
      name: mockTopic.name,
      description: mockTopic.description,
    });

    component.onFormSubmit(component.topicForm.value);

    expect(notificationService.showError).toHaveBeenCalledWith(
      'Error creating topic: Test error'
    );
    expect(component.isSubmitted).toBeFalse();
  });

  it('should validate required fields', () => {
    const form = component.topicForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('Test Topic');
    expect(form.controls['name'].valid).toBeTruthy();

    form.controls['description'].setValue('Test Description');
    expect(form.controls['description'].valid).toBeTruthy();
    expect(form.valid).toBeTruthy();
  });

  it('should validate maximum length of fields', () => {
    const form = component.topicForm;
    const longString = 'a'.repeat(101);

    form.controls['name'].setValue(longString);
    expect(form.controls['name'].errors?.['maxlength']).toBeTruthy();

    const longDescription = 'a'.repeat(2001);
    form.controls['description'].setValue(longDescription);
    expect(form.controls['description'].errors?.['maxlength']).toBeTruthy();
  });
});
