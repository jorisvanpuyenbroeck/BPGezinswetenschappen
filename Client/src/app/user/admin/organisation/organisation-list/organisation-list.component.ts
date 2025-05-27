import { Component, OnInit } from '@angular/core';
import { Organisation } from '../../../../shared/models/organisation';
import { OrganisationService } from '../../../../shared/services/organisation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css'],
})
export class AdminOrganisationListComponent implements OnInit {
  organisations: Organisation[] = [];
  organisations$: Subscription = new Subscription();
  deleteOrganisation$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private organisationService: OrganisationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getOrganisations();
  }

  ngOnDestroy(): void {
    this.organisations$.unsubscribe();
  }

  getOrganisations() {
    this.organisations$ = this.organisationService
      .getOrganisations()
      .subscribe((result: Organisation[]) => (this.organisations = result));
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/organisation/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/organisation/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteOrganisation$ = this.organisationService.deleteOrganisation(id).subscribe({
      next: (v) => this.getOrganisations(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
