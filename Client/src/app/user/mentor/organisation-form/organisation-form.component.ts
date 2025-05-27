import { Component, OnInit } from '@angular/core';
import {Organisation} from "../../../shared/models/organisation";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {OrganisationService} from "../../../shared/services/organisation.service";
import {Location} from "@angular/common";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CustomValidators} from "../../../shared/validators/custom-validators";

@Component({
  selector: 'app-mentor-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrl: './organisation-form.component.css'
})
export class MentorOrganisationFormComponent implements OnInit{

  // local variables
  organisationForm: FormGroup = new FormGroup({});

  isSubmitted: boolean = false;
  errorMessage: string = '';

  // subscriptions
  postOrganisationSubscription: Subscription = new Subscription();

  constructor(
      private router: Router,
      private organisationService: OrganisationService,
      private location: Location
  ) {}

  ngOnInit(): void {
    this.organisationForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, CustomValidators.invalidOrganisationName]),
      'address': new FormControl(null, Validators.required),
      'postalCode': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'url': new FormControl(null, Validators.required),
      'contact': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.organisationForm);
    this.postOrganisationSubscription = this.organisationService.postOrganisation(this.organisationForm.value as Organisation).subscribe({
      next: (v) => this.router.navigateByUrl("/mentor"),
      error: (e) => this.errorMessage = e.message
    });
    this.organisationForm.reset();
  }
  goBack() {
    this.location.back();
  }

}
