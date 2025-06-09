import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organisation } from '../../../../shared/models/organisation';
import { OrganisationService } from '../../../../shared/services/organisation.service';
import { Location } from '@angular/common';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormFields } from '../../../../shared/models';
import { NotificationService } from '../../../../shared/services/notification.service';

interface OrganisationFormMode {
  isEdit: boolean;
  organisationId?: number;
}

@Component({
  selector: 'app-admin-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.css'],
})
export class AdminOrganisationFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  organisation: Organisation = {
    organisationId: 0,
    name: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    url: '',
    contact: '',
  };
  organisationForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Form field configurations
  readonly fields: FormFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Organisation name',
      required: true,
    },
    {
      type: 'text',
      name: 'address',
      label: 'Address',
      placeholder: 'Street address',
      required: true,
    },
    {
      type: 'text',
      name: 'postalCode',
      label: 'Postal Code',
      placeholder: 'Postal code',
      required: true,
    },
    {
      type: 'text',
      name: 'city',
      label: 'City',
      placeholder: 'City',
      required: true,
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Phone',
      placeholder: 'Phone number',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Email address',
      required: true,
    },
    {
      type: 'text',
      name: 'url',
      label: 'Website',
      placeholder: 'Website URL',
      required: true,
    },
    {
      type: 'text',
      name: 'contact',
      label: 'Contact Person',
      placeholder: 'Contact person name',
      required: true,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private formBuilder: FormBuilder,
    private location: Location,
    private notificationService: NotificationService
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
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.organisationId) {
      this.loadOrganisation(formMode.organisationId);
    }
  }

  private getFormMode(): OrganisationFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      organisationId: this.extractOrganisationId(params['id'] || state['id']),
    };
  }

  private extractOrganisationId(
    id: string | number | undefined
  ): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.organisationForm = this.formBuilder.group({
      name: [this.organisation.name, Validators.required],
      address: [this.organisation.address, Validators.required],
      postalCode: [this.organisation.postalCode, Validators.required],
      city: [this.organisation.city, Validators.required],
      phone: [this.organisation.phone, Validators.required],
      email: [this.organisation.email, [Validators.required, Validators.email]],
      url: [this.organisation.url, Validators.required],
      contact: [this.organisation.contact, Validators.required],
    });
  }

  private loadOrganisation(id: number): void {
    const sub = this.organisationService.getOrganisationById(id).subscribe({
      next: (organisation) => {
        this.organisation = organisation;
        this.organisationForm.patchValue({
          name: organisation.name,
          address: organisation.address,
          postalCode: organisation.postalCode,
          city: organisation.city,
          phone: organisation.phone,
          email: organisation.email,
          url: organisation.url,
          contact: organisation.contact,
        });
      },
      error: (error) => {
        this.errorMessage = 'Error loading organisation: ' + error.message;
        this.notificationService.showError(this.errorMessage);
        this.router.navigate(['/admin/organisation']);
      },
    });
    this.subscriptions.add(sub);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.organisationForm.valid) {
      const organisationData = {
        ...this.organisation,
        ...this.organisationForm.value,
      };

      const request = this.isEdit
        ? this.organisationService.putOrganisation(
            this.organisation.organisationId,
            organisationData
          )
        : this.organisationService.postOrganisation(organisationData);

      const sub = request.subscribe({
        next: () => {
          const message = `Organisation successfully ${
            this.isEdit ? 'updated' : 'created'
          }`;
          this.notificationService.showSuccess(message);
          this.router.navigate(['/admin/organisation']);
        },
        error: (error) => {
          this.errorMessage = 'Error saving organisation: ' + error.message;
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
