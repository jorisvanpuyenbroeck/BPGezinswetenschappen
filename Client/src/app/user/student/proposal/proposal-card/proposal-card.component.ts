import { Component, Input } from '@angular/core';
import { Proposal } from '../../../../shared/models/proposal';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-proposal-card',
  templateUrl: './proposal-card.component.html',
  styleUrl: './proposal-card.component.css',
})
export class StudentProposalCardComponent {
  @Input() proposal: Proposal = {} as Proposal;
  @Input() user: User = {} as User;

  constructor() {}

  toggleFavourite(proposalId: number) {
    if (this.user.application?.proposals) {
      // Ensure application and proposals are defined
      if (this.isFavourite(proposalId)) {
        // If the proposal is already in the proposals array, remove it
        const index = this.user.application.proposals.indexOf(proposalId);
        if (index !== -1) {
          this.user.application.proposals.splice(index, 1);
        }
      } else {
        // If the proposal is not in the proposals array, add it
        this.user.application.proposals.push(proposalId);
      }
    }
  }

  isFavourite(proposalId: number): boolean {
    return this.user.application?.proposals?.includes(proposalId) || false; // Safely check if the proposal is in the array
  }
}
