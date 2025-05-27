import { Component, OnInit } from '@angular/core';
import {Proposal} from "../../../shared/models/proposal";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ProposalService} from "../../../shared/services/proposal.service";
import {Location} from "@angular/common";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-coach-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrl: './proposal-form.component.css'
})
export class CoachProposalFormComponent implements OnInit{

  // local variables
  proposalForm: FormGroup = new FormGroup({});

  isSubmitted: boolean = false;
  errorMessage: string = '';

  // subscriptions
  postProposalSubscription: Subscription = new Subscription();

  constructor(
      private router: Router,
      private proposalService: ProposalService,
      private location: Location
  ) {}

  ngOnInit(): void {
    this.proposalForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, Validators.required),
      'origin': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.proposalForm);
    this.postProposalSubscription = this.proposalService.postProposal(this.proposalForm.value as Proposal).subscribe({
      next: (v) => this.router.navigateByUrl("/coach"),
      error: (e) => this.errorMessage = e.message
    });
    this.proposalForm.reset();
  }
  goBack() {
    this.location.back();
  }

}
