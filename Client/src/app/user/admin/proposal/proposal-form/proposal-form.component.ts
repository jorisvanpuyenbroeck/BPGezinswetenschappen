import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proposal } from '../../../../shared/models/proposal';
import { ProposalService } from '../../../../shared/services/proposal.service';
import { TopicService } from '../../../../shared/services/topic.service';
import { Topic } from '../../../../shared/models/topic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.css'],
})
export class AdminProposalFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  proposalId: number = 0;
  origins: string[] = ['student', 'docent', 'werkveld'];
  allTopics: Topic[] = [];

  proposal: Proposal = {
    proposalId: 0,
    title: '',
    description: '',
    origin: '',
    topics: [],
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  proposalSubscription: Subscription = new Subscription();
  postProposalSubscription: Subscription = new Subscription();
  putProposalSubscription: Subscription = new Subscription();
  allTopicsSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private proposalService: ProposalService,
    private topicService: TopicService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.proposalId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.proposalId != null && this.proposalId > 0) {
      this.proposalSubscription = this.proposalService
        .getProposalById(this.proposalId)
        .subscribe((result) => (this.proposal = result));

      // console.log(this.proposal);
    }

    this.allTopicsSubscription = this.topicService.getTopics().subscribe((result) => {
      this.allTopics = result.map((t) => t);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.proposalSubscription.unsubscribe();
    this.postProposalSubscription.unsubscribe();
    this.putProposalSubscription.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postProposalSubscription = this.proposalService
        .postProposal(this.proposal)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/proposal'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
    if (this.isEdit) {
      // console.log(this.proposal);
      this.putProposalSubscription = this.proposalService
        .putProposal(this.proposalId, this.proposal)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/proposal'),
          error: (e) => (this.errorMessage = e.message),
        });
      //console.log(this.proposal);
    }
  }

  goBack() {
    this.location.back();
  }

}
