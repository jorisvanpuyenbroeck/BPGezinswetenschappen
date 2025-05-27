import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Organisation } from '../../../../shared/models/organisation';
import { OrganisationService } from '../../../../shared/services/organisation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.css'],
})
export class AdminOrganisationFormComponent implements OnInit, OnDestroy {

  // local variables
  isAdd: boolean = false;
  isEdit: boolean = false;
  organisationId: number = 0;
  organisation: Organisation = {
    organisationId: 0,
    name: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    url: '',
    contact: ''
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  // subscriptions
  organisationSubscription: Subscription = new Subscription();
  postOrganisationSubscription: Subscription = new Subscription();
  putOrganisationSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.organisationId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;

    }

    if (this.organisationId != null && this.organisationId > 0) {
      this.organisationSubscription = this.organisationService
        .getOrganisationById(this.organisationId)
        .subscribe((result) => (this.organisation = result));
    }

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.organisationSubscription.unsubscribe();
    this.postOrganisationSubscription.unsubscribe();
    this.putOrganisationSubscription.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postOrganisationSubscription = this.organisationService.postOrganisation(this.organisation).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/organisation'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.putOrganisationSubscription = this.organisationService
        .putOrganisation(this.organisationId, this.organisation)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/organisation'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
  }
  goBack() {
    this.location.back();
  }

}
