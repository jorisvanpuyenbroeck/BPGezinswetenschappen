import { Component, OnInit, OnDestroy } from '@angular/core';
import { Proposal } from '../../../shared/models/proposal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProposalService } from '../../../shared/services/proposal.service';
import { Location } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { FormFields } from '../../../shared/models';

interface ProposalFormValue {
  title: string;
  description: string;
  origin: string;
}

@Component({
  selector: 'app-coach-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrl: './proposal-form.component.css',
})
export class CoachProposalFormComponent implements OnInit, OnDestroy {
  // Form state
  proposalForm: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  errorMessage: string = '';

  // Form field configurations
  readonly originOptions = [
    { value: 'student', viewValue: 'Student' },
    { value: 'docent', viewValue: 'Docent' },
    { value: 'werkveld', viewValue: 'Werkveld' },
  ];

  readonly fields: FormFields = [
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
      rows: 7,
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
  ];

  // Subscriptions
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private proposalService: ProposalService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initForm(): void {
    this.proposalForm = this.fb.group<{ [K in keyof ProposalFormValue]: any }>({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      origin: ['', [Validators.required]],
    });
  }

  onFormSubmit(formValue: ProposalFormValue): void {
    this.isSubmitted = true;
    if (this.proposalForm.valid) {
      const sub = this.proposalService
        .postProposal(formValue as Proposal)
        .subscribe({
          next: () => this.router.navigateByUrl('/coach'),
          error: (error: Error) => (this.errorMessage = error.message),
        });
      this.subscriptions.add(sub);
    }
  }

  onFormCancel(): void {
    this.location.back();
  }
}
