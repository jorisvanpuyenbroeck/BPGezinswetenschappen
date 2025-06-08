import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Organisation } from '../../../../shared/models/organisation';
import { OrganisationService } from '../../../../shared/services/organisation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
  allColumns: string[] = ['organisationId', 'name', 'address', 'actions'];
  hideableColumns: string[] = []; // No columns to hide by default
  dataSource = new MatTableDataSource<Organisation>([]);
  organisations$: Subscription = new Subscription();
  deleteOrganisation$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private organisationService: OrganisationService,
    private router: Router,
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
    this.router.navigate(['admin/organisation/form'], {
      state: { mode: 'add' },
    });
  }

  onEdit(organisation: Organisation) {
    this.router.navigate(['admin/organisation/form'], {
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
        error: (error) => {
          this.showNotification(
            'Error deleting organisation: ' + error.message,
            'Close'
          );
        },
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
