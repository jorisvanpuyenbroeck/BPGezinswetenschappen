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

  // This will store just the selected topic IDs for the mat-select
  selectedTopicIds: number[] = [];

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
    } // First get all topics
    this.allTopicsSubscription = this.topicService
      .getTopics()
      .subscribe((result) => {
        this.allTopics = result;

        // After getting all topics, fetch the proposal (if editing)
        if (this.proposalId != null && this.proposalId > 0) {
          this.proposalSubscription = this.proposalService
            .getProposalById(this.proposalId)
            .subscribe((result) => {
              this.proposal = result;

              // Set the selected topic IDs for the mat-select
              if (this.proposal.topics && this.proposal.topics.length > 0) {
                this.selectedTopicIds = this.proposal.topics.map(
                  (t) => t.topicId
                );
                console.log('Selected topic IDs:', this.selectedTopicIds);
              }
            });
        }
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

    // Update the proposal.topics array from the selectedTopicIds
    if (this.selectedTopicIds && this.selectedTopicIds.length > 0) {
      this.proposal.topics = this.selectedTopicIds.map((id) => {
        // Find the full topic object from allTopics
        const fullTopic = this.allTopics.find((t) => t.topicId === id);
        return fullTopic || { topicId: id, name: '', description: '' };
      });
    } else {
      this.proposal.topics = [];
    }

    if (this.isAdd) {
      this.postProposalSubscription = this.proposalService
        .postProposal(this.proposal)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/proposal'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
    if (this.isEdit) {
      this.putProposalSubscription = this.proposalService
        .putProposal(this.proposalId, this.proposal)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/proposal'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
