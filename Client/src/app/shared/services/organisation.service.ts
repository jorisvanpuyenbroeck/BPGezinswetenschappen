import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisation } from '../models/organisation'; // Make sure to import your Organisation model
import { ApiConfigService } from '../../app.config'; // Inject the config service

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  private readonly organisationsEndpoint = 'organisations'; // API endpoint (relative path)

  constructor(
    private httpClient: HttpClient,
    private apiConfigService: ApiConfigService // Inject the config service
  ) {}

  getOrganisations(): Observable<Organisation[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.organisationsEndpoint}`;
    return this.httpClient.get<Organisation[]>(url);
  }

  getOrganisationById(id: number): Observable<Organisation> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.organisationsEndpoint}/${id}`;
    return this.httpClient.get<Organisation>(url);
  }

  postOrganisation(organisation: Organisation): Observable<Organisation> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.organisationsEndpoint}`;
    return this.httpClient.post<Organisation>(url, organisation);
  }

  putOrganisation(
    id: number,
    organisation: Organisation
  ): Observable<Organisation> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.organisationsEndpoint}/${id}`;
    return this.httpClient.put<Organisation>(url, organisation);
  }

  deleteOrganisation(id: number): Observable<Organisation> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.organisationsEndpoint}/${id}`;
    return this.httpClient.delete<Organisation>(url);
  }
}
