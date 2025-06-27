import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {
  Project,
  ProjectCreateDto,
  ProjectUpdateDto,
} from '../../../../shared/models/project';
import { ProjectService } from '../../../../shared/services/project.service';
import { TopicService } from '../../../../shared/services/topic.service';
import { Topic } from '../../../../shared/models/topic';
import { NotificationService } from '../../../../shared/services/notification.service';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormFields } from '../../../../shared/models';
import { User } from '../../../../shared/models/user';
import { Organisation } from '../../../../shared/models/organisation';
import { Proposal } from '../../../../shared/models/proposal';
import { ProposalService } from 'src/app/shared/services/proposal.service';

interface ProjectFormMode {
  isEdit: boolean;
  projectId?: number;
}

interface ProjectFormValue {
  title: string;
  description: string;
  stage: string;
  active: boolean;
  supported: boolean;
  reviewed: boolean;
  approved: boolean;
  feedback: string;
  studentId: number;
  coachId: number;
  organisationId: number;
  proposalId: number;
  topicIds: number[];
}

@Component({
  selector: 'app-admin-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class AdminProjectFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  project: Project = {
    projectId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    description: '',
    stage: '',
    active: false,
    supported: false,
    reviewed: false,
    approved: false,
    feedback: '',
    studentId: 0,
    coachId: 0,
    organisationId: 0,
    proposalId: 0,
    student: {} as User,
    coach: {} as User,
    organisation: {} as Organisation,
    proposal: {} as Proposal,
    topics: [],
  };
  projectForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Data for select fields
  allTopics: Topic[] = [];
  allProposals: Proposal[] = [];
  stageOptions = [
    { value: 'Gestart', viewValue: 'Started' },
    { value: 'InUitvoering', viewValue: 'In Progress' },
    { value: 'Afgewerkt', viewValue: 'Completed' },
  ];

  // Form field configurations
  fields: FormFields = [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      placeholder: 'Project title',
      required: true,
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      placeholder: 'Project description',
      rows: 5,
      required: true,
    },
    {
      type: 'select',
      name: 'stage',
      label: 'Stage',
      placeholder: 'Select stage',
      required: true,
      options: this.stageOptions,
    },
    {
      type: 'select',
      name: 'topicIds',
      label: 'Topics',
      placeholder: 'Select topics',
      required: true,
      options: [], // Will be populated with topics
      multiple: true,
    },
    {
      type: 'text',
      name: 'studentId',
      label: 'Student ID',
      placeholder: 'Enter student ID',
      required: true,
    },
    {
      type: 'text',
      name: 'coachId',
      label: 'Coach ID',
      placeholder: 'Enter coach ID',
      required: true,
    },
    {
      type: 'text',
      name: 'organisationId',
      label: 'Organisation ID',
      placeholder: 'Enter organisation ID',
      required: true,
    },
    {
      type: 'text',
      name: 'proposalId',
      label: 'Proposal ID',
      placeholder: 'Enter proposal ID',
      required: true,
    },
    {
      type: 'textarea',
      name: 'feedback',
      label: 'Feedback',
      placeholder: 'Enter feedback',
      rows: 3,
      required: false,
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private topicService: TopicService,
    private proposalService: ProposalService,
    private location: Location,
    private fb: FormBuilder,
    private notificationService: NotificationService
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

    if (formMode.isEdit && formMode.projectId) {
      this.loadProject(formMode.projectId);
    }
  }

  private getFormMode(): ProjectFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      projectId: this.extractProjectId(params['id'] || state['id']),
    };
  }

  private extractProjectId(
    id: string | number | undefined
  ): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.projectForm = this.fb.group<{ [K in keyof ProjectFormValue]: any }>({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      stage: ['', [Validators.required]],
      active: [false],
      supported: [false],
      reviewed: [false],
      approved: [false],
      feedback: ['', [Validators.maxLength(2000)]],
      studentId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      coachId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      organisationId: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      proposalId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      topicIds: [[], [Validators.required]],
    });
  }

  private loadTopics(): void {
    const sub = this.topicService.getTopics().subscribe({
      next: (topics: Topic[]) => {
        this.allTopics = topics;
        // Update the topics select field options
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
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }
  private loadProposals(): void {
    const sub = this.proposalService.getProposals().subscribe({
      next: (proposals: Proposal[]) => {
        this.allProposals = proposals;
        // Update the topics select field options
        const proposalOptions = proposals.map((proposal) => ({
          value: proposal.proposalId,
          viewValue: proposal.title,
        }));
        this.fields = this.fields.map((field) => {
          if (field.type === 'select' && field.name === 'proposalIds') {
            return { ...field, options: proposalOptions };
          }
          return field;
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading topics: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  private loadProject(id: number): void {
    const sub = this.projectService.getProjectById(id).subscribe({
      next: (project: Project) => {
        this.project = project;
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          stage: project.stage,
          active: project.active,
          supported: project.supported,
          reviewed: project.reviewed,
          approved: project.approved,
          feedback: project.feedback,
          studentId: project.studentId?.toString(),
          coachId: project.coachId?.toString(),
          organisationId: project.organisationId?.toString(),
          proposalId: project.proposalId?.toString(),
          topicIds: project.topics?.map((t) => t.topicId) ?? [],
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading project: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onFormSubmit(formValue: ProjectFormValue): void {
    this.isSubmitted = true;
    if (this.projectForm.valid) {
      const projectData = {
        ...this.project,
        title: formValue.title,
        description: formValue.description,
        stage: formValue.stage,
        active: formValue.active,
        supported: formValue.supported,
        reviewed: formValue.reviewed,
        approved: formValue.approved,
        feedback: formValue.feedback,
        studentId: parseInt(formValue.studentId.toString(), 10),
        coachId: parseInt(formValue.coachId.toString(), 10),
        organisationId: parseInt(formValue.organisationId.toString(), 10),
        proposalId: parseInt(formValue.proposalId.toString(), 10),
        topics: this.allTopics.filter((t) =>
          formValue.topicIds.includes(t.topicId)
        ),
        updatedAt: new Date(),
      };

      const sub = (
        this.isEdit
          ? this.projectService.putProjectAsAdmin(
              this.project.projectId,
              projectData
            )
          : this.projectService.postProjectAsAdmin(projectData)
      ).subscribe({
        next: () => {
          const message = `Project successfully ${
            this.isEdit ? 'updated' : 'created'
          }`;
          this.notificationService.showSuccess(message);
          this.router.navigate(['/admin/project']);
        },
        error: (error: Error) => {
          this.errorMessage = `Error ${
            this.isEdit ? 'updating' : 'creating'
          } project: ${error.message}`;
          this.notificationService.showError(this.errorMessage);
        },
      });
      this.subscriptions.add(sub);
    }
  }

  onFormCancel(): void {
    this.location.back();
  }
}
