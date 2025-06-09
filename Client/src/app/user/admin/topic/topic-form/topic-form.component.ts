import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Topic,
  TopicCreateDto,
  TopicUpdateDto,
} from '../../../../shared/models/topic';
import { TopicService } from '../../../../shared/services/topic.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormFields } from '../../../../shared/models';

interface TopicFormMode {
  isEdit: boolean;
  topicId?: number;
}

interface TopicFormValue {
  name: string;
  description: string;
}

@Component({
  selector: 'app-admin-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css'],
})
export class AdminTopicFormComponent implements OnInit, OnDestroy {
  // Output events for side-by-side layout communication
  @Output() savedTopic = new EventEmitter<Topic>();
  @Output() cancelled = new EventEmitter<void>();

  // Reference to the generic form component
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  topic: Topic = { topicId: 0, name: '', description: '' };
  topicForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Form field configurations
  readonly fields: FormFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Topic name',
      required: true,
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      placeholder: 'Provide a detailed description of the topic',
      rows: 5,
      required: true,
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private topicService: TopicService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initializeFormMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeFormMode(): void {
    // Combine route params and state
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.topicId) {
      this.loadTopic(formMode.topicId);
    }
  }

  private getFormMode(): TopicFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    // First check URL params, then fallback to router state
    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      topicId: this.extractTopicId(params['id'] || state['id']),
    };
  }

  private extractTopicId(id: string | number | undefined): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.topicForm = this.fb.group<{ [K in keyof TopicFormValue]: any }>({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
    });
  }

  private loadTopic(id: number): void {
    const sub = this.topicService.getTopicById(id).subscribe({
      next: (topic: Topic) => {
        this.topic = topic;
        this.topicForm.patchValue({
          name: topic.name,
          description: topic.description,
        } as TopicFormValue);
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading topic: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onFormSubmit(formValue: TopicFormValue): void {
    this.isSubmitted = true;
    if (this.topicForm.valid) {
      const topicData: TopicCreateDto & TopicUpdateDto = {
        name: formValue.name,
        description: formValue.description,
      };

      const sub = (
        this.isEdit && this.topic.topicId
          ? this.topicService.putTopic(this.topic.topicId, topicData)
          : this.topicService.postTopic(topicData)
      ).subscribe({
        next: (savedTopic: Topic) => {
          const message = `Topic successfully ${
            this.isEdit ? 'updated' : 'created'
          }`;
          this.notificationService.showSuccess(message);
          this.savedTopic.emit(savedTopic);
          if (!this.savedTopic.observed) {
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        },
        error: (error: Error) => {
          this.errorMessage = `Error ${
            this.isEdit ? 'updating' : 'creating'
          } topic: ${error.message}`;
          this.notificationService.showError(this.errorMessage);
          this.isSubmitted = false;
        },
      });
      this.subscriptions.add(sub);
    }
  }

  onFormCancel(): void {
    this.cancelled.emit();
    if (!this.cancelled.observed) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
