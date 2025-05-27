import { Component, OnInit } from '@angular/core';
import { Proposal } from '../../../../shared/models/proposal';
import { ProposalService } from '../../../../shared/services/proposal.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
})
export class StudentProposalListComponent implements OnInit {
  // local
  public proposals: Proposal[] = [];
  public user: User = {} as User;

  // Subscriptions
  proposalsSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();

  constructor(
    public proposalService: ProposalService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.userStore$.subscribe((user) => {
      console.log('topic list component initialized');
      // Update the local student property
      this.user = user;
    });

    if (this.user.application?.topics) {
      this.getProposalsByTopics(this.user.application.topics);
    }
  }

  ngOnDestroy(): void {
    this.proposalsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  getProposals() {
    this.proposalsSubscription = this.proposalService
      .getProposals()
      .subscribe((result) => (this.proposals = result));
  }

  getProposalsByTopics(topics: number[]) {
    this.proposalsSubscription = this.proposalService
      .getProposalsByTopics(topics)
      .subscribe((result) => (this.proposals = result));
  }

  saveProposals() {
    if (this.userService.checkApplicationProgress(this.user, 'proposals')) {
      if (this.user.application) {
        // Ensure application is defined
        this.user.application.proposalsSaved = true;
      }
      console.log('saved', this.user || 'student triggered');
      // this.student$.subscribe(student => {
      //   this.topicService.saveTopics(student.application.topics);
    }
  }
}
