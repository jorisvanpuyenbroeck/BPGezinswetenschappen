import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Organisation } from '../../../../shared/models/organisation';
import { OrganisationService } from '../../../../shared/services/organisation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css'],
})
export class AdminOrganisationListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['organisationId', 'name', 'address', 'actions'];
  dataSource = new MatTableDataSource<Organisation>([]);
  organisations$: Subscription = new Subscription();
  deleteOrganisation$: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private organisationService: OrganisationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getOrganisations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
            'error'
          );
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/organisation/form'], {
      state: { mode: 'add' },
    });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/organisation/form'], {
      state: { id: id, mode: 'edit' },
    });
  }
  delete(id: number) {
    this.deleteOrganisation$ = this.organisationService
      .deleteOrganisation(id)
      .subscribe({
        next: () => {
          this.getOrganisations();
          this.showNotification('Organisation successfully deleted', 'success');
        },
        error: (error) => {
          this.showNotification(
            'Error deleting organisation: ' + error.message,
            'error'
          );
        },
      });
  }
  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
