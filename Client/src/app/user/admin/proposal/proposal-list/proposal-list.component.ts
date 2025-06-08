import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Proposal } from '../../../../shared/models/proposal';
import { ProposalService } from '../../../../shared/services/proposal.service';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
})
export class AdminProposalListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = [
    'proposalId',
    'title',
    'description',
    'origin',
    'topics',
    'actions',
  ];
  hideableColumns: string[] = ['description', 'topics']; // Columns that will be hidden on small screens
  dataSource = new MatTableDataSource<Proposal>([]);
  proposals$: Subscription = new Subscription();
  deleteProposal$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;
  constructor(
    private proposalService: ProposalService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProposals();
  }
  ngOnDestroy(): void {
    this.proposals$.unsubscribe();
    if (this.deleteProposal$) {
      this.deleteProposal$.unsubscribe();
    }
  }
  getProposals() {
    this.proposals$ = this.proposalService.getProposals().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (error) => {
        this.showNotification(
          'Error loading proposals: ' + error.message,
          'Close'
        );
      },
    });
  }

  // Handle events from generic list componentd

  onAdd() {
    this.router.navigate(['admin/proposal/form'], { state: { mode: 'add' } });
  }

  onEdit(proposal: Proposal) {
    this.router.navigate(['admin/proposal/form'], {
      state: { id: proposal.proposalId, mode: 'edit' },
    });
  }

  onDelete(proposal: Proposal) {
    this.deleteProposal$ = this.proposalService
      .deleteProposal(proposal.proposalId)
      .subscribe({
        next: () => {
          this.getProposals();
          this.showNotification('proposal successfully deleted', 'Close');
        },
        error: (error) => {
          this.showNotification(
            'Error deleting proposal: ' + error.message,
            'Close'
          );
        },
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
