import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Topic, TopicCreateDto } from '../../../../shared/models/topic';
import { TopicService } from '../../../../shared/services/topic.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      this.resetForm();
    }
  }
  get topicId(): number | null {
    return this._topicId;
  }
  private _topicId: number | null = 0;

  // Output events for side-by-side layout communication
  @Output() savedTopic = new EventEmitter<Topic>();
  @Output() cancelled = new EventEmitter<void>();

  topic: Topic = { topicId: 0, name: '', description: '' };
  topicForm!: FormGroup;

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
    private fb: FormBuilder,
    private snackBar: MatSnackBar
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
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  private resetForm(): void {
    this.topic = { topicId: 0, name: '', description: '' };
    if (this.topicForm) {
      this.topicForm.reset({
        name: '',
        description: '',
      });
    }
  }

  private loadTopic(id: number): void {
    this.topic$ = this.topicService.getTopicById(id).subscribe({
      next: (result) => {
        this.topic = result;
        this.topicForm.setValue({
          name: this.topic.name,
          description: this.topic.description,
        });
      },
      error: (error) => {
        this.errorMessage = `Error loading topic: ${error.message}`;
        this.snackBar.open('Failed to load topic', 'Close', { duration: 3000 });
      },
    });
  }

  onSubmit() {
    if (this.topicForm.invalid) {
      return;
    }

    this.isSubmitted = true;

    // Update topic from form values
    this.topic.name = this.topicForm.value.name;
    this.topic.description = this.topicForm.value.description;

    if (this.isAdd) {
      const dto: TopicCreateDto = {
        name: this.topic.name,
        description: this.topic.description,
      };

      this.postTopic$ = this.topicService.postTopic(dto).subscribe({
        next: (result) => {
          this.snackBar.open('Topic created successfully', 'Close', {
            duration: 3000,
          });
          this.savedTopic.emit(result);
          // For backwards compatibility
          if (!this.savedTopic.observed) {
            this.router.navigateByUrl('/admin/topic');
          }
        },
        error: (e) => {
          this.isSubmitted = false;
          this.errorMessage = e.message;
          this.snackBar.open('Failed to create topic', 'Close', {
            duration: 3000,
          });
        },
      });
    }

    if (this.isEdit && this._topicId) {
      this.putTopic$ = this.topicService
        .putTopic(this._topicId, this.topic)
        .subscribe({
          next: (result) => {
            this.snackBar.open('Topic updated successfully', 'Close', {
              duration: 3000,
            });
            this.savedTopic.emit(result);
            // For backwards compatibility
            if (!this.savedTopic.observed) {
              this.router.navigateByUrl('/admin/topic');
            }
          },
          error: (e) => {
            this.isSubmitted = false;
            this.errorMessage = e.message;
            this.snackBar.open('Failed to update topic', 'Close', {
              duration: 3000,
            });
          },
        });
    }
  }

  goBack() {
    // Emit cancel event if there are observers, otherwise fall back to location.back()
    if (this.cancelled.observed) {
      this.cancelled.emit();
    } else {
      this.location.back();
    }
  }
}
