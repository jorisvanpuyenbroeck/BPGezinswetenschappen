import { Component, OnInit } from '@angular/core';
import { Proposal } from '../../../../shared/models/proposal';
import { ProposalService } from '../../../../shared/services/proposal.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Topic } from '../../../../shared/models/topic';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
})
export class AdminProposalListComponent implements OnInit {
  proposals: Proposal[] = [];
  proposalsSubscription: Subscription = new Subscription();
  deleteProposalSubscription: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private proposalService: ProposalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProposals();
  }

  ngOnDestroy(): void {
    this.proposalsSubscription.unsubscribe();
  }

  getProposals() {
    this.proposalsSubscription = this.proposalService
      .getProposals()
      .subscribe((result) => (this.proposals = result));
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/proposal/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/proposal/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteProposalSubscription = this.proposalService.deleteProposal(id).subscribe({
      next: (v) => this.getProposals(),
      error: (e) => (this.errorMessage = e.message),
    });
  }

  getNames(topics: Topic[]) {
    return topics.map((t) => t.name).join(', ');
  }
}
