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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Proposal,
  ProposalCreateDto,
  ProposalUpdateDto,
} from '../../../../shared/models/proposal';
import { ProposalService } from '../../../../shared/services/proposal.service';
import { TopicService } from '../../../../shared/services/topic.service';
import { Topic } from '../../../../shared/models/topic';
import { NotificationService } from '../../../../shared/services/notification.service';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import {
  FormFields,
  TextFieldConfig,
  TextareaFieldConfig,
  SelectFieldConfig,
} from '../../../../shared/models';

/**
 * Interface for the form mode state
 */
interface ProposalFormMode {
  isEdit: boolean;
  proposalId?: number;
}

/**
 * Interface for the form values
 */
interface ProposalFormValue {
  title: string;
  description: string;
  origin: string;
  topicIds: number[];
}

@Component({
  selector: 'app-admin-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.css'],
})
export class AdminProposalFormComponent implements OnInit, OnDestroy {
  // Output events for side-by-side layout communication
  @Output() savedProposal = new EventEmitter<Proposal>();
  @Output() cancelled = new EventEmitter<void>();

  // Reference to the generic form component
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  proposal: Proposal = {
    proposalId: 0,
    title: '',
    description: '',
    origin: '',
    topics: [],
  };
  proposalForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Data needed for form fields
  allTopics: Topic[] = [];

  // Form field configurations
  readonly originOptions = [
    { value: 'student', viewValue: 'Student' },
    { value: 'docent', viewValue: 'Docent' },
    { value: 'werkveld', viewValue: 'Werkveld' },
  ];

  // Mutable fields array
  fields: (TextFieldConfig | TextareaFieldConfig | SelectFieldConfig)[] = [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      placeholder: 'Proposal title',
      required: true,
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      placeholder: 'Provide a detailed description of the proposal',
      rows: 5,
      required: true,
    },
    {
      type: 'select',
      name: 'origin',
      label: 'Origin',
      placeholder: 'Select the origin',
      required: true,
      options: this.originOptions,
    },
    {
      type: 'select',
      name: 'topicIds',
      label: 'Topics',
      placeholder: 'Select related topics',
      required: true,
      options: [],
      multiple: true,
    },
  ];

  private subscriptions = new Subscription();

  private initForm(): void {
    this.proposalForm = this.fb.group<{ [K in keyof ProposalFormValue]: any }>({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      origin: ['', [Validators.required]],
      topicIds: [[], [Validators.required]],
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private topicService: TopicService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadTopics();
    this.initializeFormMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeFormMode(): void {
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.proposalId) {
      this.loadProposal(formMode.proposalId);
    }
  }

  private getFormMode(): ProposalFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      proposalId: this.extractProposalId(params['id'] || state['id']),
    };
  }

  private extractProposalId(
    id: string | number | undefined
  ): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private loadTopics(): void {
    const sub = this.topicService.getTopics().subscribe({
      next: (topics: Topic[]) => {
        this.allTopics = topics;
        // Update the topics select field options without modifying readonly properties
        const topicOptions = topics.map((topic) => ({
          value: topic.topicId,
          viewValue: topic.name,
        }));
        this.fields = this.fields.map((field) => {
          if (field.type === 'select' && field.name === 'topicIds') {
            return { ...field, options: topicOptions };
          }
          return field;
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading topics: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  private loadProposal(id: number): void {
    const sub = this.proposalService.getProposalById(id).subscribe({
      next: (proposal: Proposal) => {
        this.proposal = proposal;
        this.proposalForm.patchValue({
          title: proposal.title,
          description: proposal.description,
          origin: proposal.origin,
          topicIds: proposal.topics?.map((t) => t.topicId) ?? [],
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading proposal: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }
  onFormSubmit(formValue: ProposalFormValue): void {
    this.isSubmitted = true;
    if (this.proposalForm.valid) {
      const proposalData = {
        title: formValue.title,
        description: formValue.description,
        origin: formValue.origin,
        topicIds: formValue.topicIds,
      };

      const sub = (
        this.isEdit && this.proposal.proposalId
          ? this.proposalService.putProposal(
              this.proposal.proposalId,
              proposalData
            )
          : this.proposalService.postProposal(proposalData)
      ).subscribe({
        next: (savedProposal: Proposal) => {
          const message = `Proposal successfully ${
            this.isEdit ? 'updated' : 'created'
          }`;
          this.notificationService.success(message);
          this.savedProposal.emit(savedProposal);
          if (!this.savedProposal.observed) {
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        },
        error: (error: Error) => {
          this.errorMessage = `Error ${
            this.isEdit ? 'updating' : 'creating'
          } proposal: ${error.message}`;
          this.notificationService.error(this.errorMessage);
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
