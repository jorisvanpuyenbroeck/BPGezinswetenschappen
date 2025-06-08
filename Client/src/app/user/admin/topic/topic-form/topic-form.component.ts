import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Topic,
  TopicCreateDto,
  TopicUpdateDto,
} from '../../../../shared/models/topic';
import { TopicService } from '../../../../shared/services/topic.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';

@Component({
  selector: 'app-admin-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css'],
})
export class AdminTopicFormComponent implements OnInit, OnDestroy {
  // Input property to support side-by-side layout
  @Input() set topicId(value: number | null) {
    if (value && value > 0) {
      this._topicId = value;
      this.isEdit = true;
      this.isAdd = false;
      this.loadTopic(value);
    } else {
      this._topicId = 0;
      this.isAdd = true;
      this.isEdit = false;
    }
  }
  get topicId(): number | null {
    return this._topicId;
  }
  private _topicId: number | null = 0;

  // Output events for side-by-side layout communication
  @Output() savedTopic = new EventEmitter<Topic>();
  @Output() cancelled = new EventEmitter<void>();

  // Reference to the generic form component
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  topic: Topic = { topicId: 0, name: '', description: '' };
  topicForm!: FormGroup;

  // Form field configurations for generic form
  textFields = [
    { name: 'name', label: 'Name', placeholder: 'Topic name', required: true },
  ];

  textareaFields = [
    {
      name: 'description',
      label: 'Description',
      placeholder: 'Provide a detailed description of the topic',
      rows: 5,
      required: true,
    },
  ];

  isAdd: boolean = true;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  topic$: Subscription = new Subscription();
  postTopic$: Subscription = new Subscription();
  putTopic$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private topicService: TopicService,
    private location: Location,
    private fb: FormBuilder
  ) {
    // For backwards compatibility with router state navigation
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    if (routerState) {
      if (routerState['mode'] === 'edit' && routerState['id']) {
        this.topicId = +routerState['id'];
      } else if (routerState['mode'] === 'add') {
        this.topicId = null;
      }
    }

    this.initForm();
  }

  ngOnInit(): void {
    // Form initialization is now done in constructor and the topicId setter
  }

  ngOnDestroy(): void {
    this.topic$.unsubscribe();
    this.postTopic$.unsubscribe();
    this.putTopic$.unsubscribe();
  }

  private initForm(): void {
    this.topicForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
    });
  }

  private loadTopic(id: number): void {
    this.topic$ = this.topicService.getTopicById(id).subscribe({
      next: (topic: Topic) => {
        this.topic = topic;
        this.topicForm.patchValue({
          name: topic.name,
          description: topic.description,
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading topic: ' + error.message;
      },
    });
  }

  onFormSubmit(formValue: any): void {
    this.isSubmitted = true;
    if (this.topicForm.valid) {
      const topicData: TopicCreateDto & TopicUpdateDto = {
        name: formValue.name,
        description: formValue.description,
      };

      if (this.isEdit && this._topicId) {
        this.putTopic$ = this.topicService
          .putTopic(this._topicId, topicData)
          .subscribe({
            next: (updatedTopic: Topic) => {
              this.savedTopic.emit(updatedTopic);
              if (!this.savedTopic.observed) {
                this.location.back();
              }
            },
            error: (error: Error) => {
              this.errorMessage = 'Error updating topic: ' + error.message;
              this.isSubmitted = false;
            },
          });
      } else {
        this.postTopic$ = this.topicService.postTopic(topicData).subscribe({
          next: (newTopic: Topic) => {
            this.savedTopic.emit(newTopic);
            if (!this.savedTopic.observed) {
              this.location.back();
            }
          },
          error: (error: Error) => {
            this.errorMessage = 'Error creating topic: ' + error.message;
            this.isSubmitted = false;
          },
        });
      }
    }
  }

  onFormCancel(): void {
    this.cancelled.emit();
    if (!this.cancelled.observed) {
      this.location.back();
    }
  }
}
