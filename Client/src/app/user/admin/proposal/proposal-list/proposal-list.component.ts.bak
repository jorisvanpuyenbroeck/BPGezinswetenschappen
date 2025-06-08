import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class AdminProposalListComponent implements OnInit, AfterViewInit {
  proposals: Proposal[] = [];
  proposalsSubscription: Subscription = new Subscription();
  deleteProposalSubscription: Subscription = new Subscription();
  errorMessage: string = '';

  displayedColumns: string[] = [
    'proposalId',
    'title',
    'description',
    'origin',
    'topics',
    'actions',
  ];
  dataSource = new MatTableDataSource<Proposal>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private proposalService: ProposalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProposals();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.proposalsSubscription.unsubscribe();
    if (this.deleteProposalSubscription) {
      this.deleteProposalSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProposals() {
    this.proposalsSubscription = this.proposalService.getProposals().subscribe({
      next: (result) => {
        this.proposals = result;
        this.dataSource.data = this.proposals;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load proposals. Please try again later.';
        console.error('Error loading proposals:', error);
      },
    });
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
    this.deleteProposalSubscription = this.proposalService
      .deleteProposal(id)
      .subscribe({
        next: (v) => this.getProposals(),
        error: (e) => (this.errorMessage = e.message),
      });
  }

  getNames(topics: Topic[]) {
    return topics.map((t) => t.name).join(', ');
  }
}
