import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Organisation } from '../../../../shared/models/organisation';
import { OrganisationService } from '../../../../shared/services/organisation.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css'],
})
export class AdminOrganisationListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = [
    'organisationId',
    'name',
    'address',
    'city',
    'contact',
    'actions',
  ];
  hideableColumns: string[] = []; // No columns to hide by default
  dataSource = new MatTableDataSource<Organisation>([]);
  organisations$: Subscription = new Subscription();
  deleteOrganisation$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private organisationService: OrganisationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getOrganisations();
  }

  ngOnDestroy(): void {
    this.organisations$.unsubscribe();
    if (this.deleteOrganisation$) {
      this.deleteOrganisation$.unsubscribe();
    }
  }

  getOrganisations() {
    this.organisations$ = this.organisationService
      .getOrganisations()
      .subscribe({
        next: (result) => {
          this.dataSource.data = result;
        },
        error: (error) => {
          this.showNotification(
            'Error loading organisations: ' + error.message,
            'Close'
          );
        },
      });
  }

  // Handle events from generic list component
  onAdd() {
    this.router.navigate(['../organisation/form'], {
      relativeTo: this.route,
      state: { mode: 'add' },
    });
  }

  onEdit(organisation: Organisation) {
    this.router.navigate(['../organisation/form'], {
      relativeTo: this.route,
      state: { id: organisation.organisationId, mode: 'edit' },
    });
  }

  onDelete(organisation: Organisation) {
    this.deleteOrganisation$ = this.organisationService
      .deleteOrganisation(organisation.organisationId)
      .subscribe({
        next: () => {
          this.getOrganisations();
          this.showNotification('Organisation successfully deleted', 'Close');
        },
        error: (error: any) => {
          // Display server-provided error message if available
          const serverMsg = error.error || error.message;
          this.showNotification(
            'Error deleting organisation: ' + serverMsg,
            'Close'
          );
        },
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
