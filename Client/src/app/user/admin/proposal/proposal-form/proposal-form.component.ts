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
    }

    // First get all topics
    this.allTopicsSubscription = this.topicService
      .getTopics()
      .subscribe((result) => {
        this.allTopics = result;

        // After getting all topics, fetch the proposal (if editing)
        if (this.proposalId != null && this.proposalId > 0) {
          this.proposalSubscription = this.proposalService
            .getProposalById(this.proposalId)
            .subscribe((result) => {
              this.proposal = result; // Set the selected topic IDs for the mat-select
              if (this.proposal.topics && this.proposal.topics.length > 0) {
                this.selectedTopicIds = this.proposal.topics.map(
                  (t) => t.topicId
                );
                console.log(
                  'Loaded proposal with topics:',
                  this.proposal.topics
                );
                console.log(
                  'Mapped to selectedTopicIds:',
                  this.selectedTopicIds
                );
              } else {
                // Initialize with empty array if no topics
                this.selectedTopicIds = [];
                console.log('No topics found for this proposal');
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

    // Ensure we have valid topic IDs array (not null or undefined)
    const topicIdsArray = this.selectedTopicIds || [];

    // Create data transfer object for API - same format for both add and edit
    const proposalDto = {
      title: this.proposal.title,
      description: this.proposal.description,
      origin: this.proposal.origin,
      topicIds: topicIdsArray,
    };
    if (this.isAdd) {
      console.log('Posting proposal with DTO:', proposalDto);

      this.postProposalSubscription = this.proposalService
        .postProposal(proposalDto)
        .subscribe({
          next: (v) => {
            console.log('Proposal created successfully:', v);
            this.router.navigateByUrl('/admin/proposal');
          },
          error: (e) => {
            console.error('Error creating proposal:', e);
            this.errorMessage = e.message || 'Error creating proposal';
          },
        });
    }
    if (this.isEdit) {
      console.log(
        'Updating proposal with ID:',
        this.proposalId,
        'and DTO:',
        proposalDto
      );
      console.log('Selected topic IDs:', this.selectedTopicIds);

      this.putProposalSubscription = this.proposalService
        .putProposal(this.proposalId, proposalDto)
        .subscribe({
          next: (v) => {
            console.log('Proposal updated successfully:', v);
            this.router.navigateByUrl('/admin/proposal');
          },
          error: (e) => {
            console.error('Error updating proposal:', e);
            this.errorMessage = e.message || 'Error updating proposal';
          },
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
