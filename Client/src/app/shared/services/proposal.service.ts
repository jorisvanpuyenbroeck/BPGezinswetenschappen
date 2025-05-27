import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal'; // Make sure to import your Proposal model
import { ApiConfigService } from '../../app.config'; // Import the config service

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private readonly proposalsEndpoint = 'proposals'; // API endpoint (relative path)

  constructor(
    private httpClient: HttpClient,
    private apiConfigService: ApiConfigService // Inject the config service
  ) {}

  getProposals(): Observable<Proposal[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}`;
    return this.httpClient.get<Proposal[]>(url);
  }

  getProposalById(id: number): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/${id}`;
    return this.httpClient.get<Proposal>(url);
  }

  getProposalsByTopics(topicIds: number[]): Observable<Proposal[]> {
    const queryString = topicIds.map((id) => `topicIds=${id}`).join('&');
    const apiUrl = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/by-topic?${queryString}`;
    return this.httpClient.get<Proposal[]>(apiUrl);
  }

  postProposal(proposal: Proposal): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}`;
    return this.httpClient.post<Proposal>(url, proposal);
  }

  putProposal(id: number, proposal: Proposal): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/${id}`;
    return this.httpClient.put<Proposal>(url, proposal);
  }

  deleteProposal(id: number): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/${id}`;
    return this.httpClient.delete<Proposal>(url);
  }
}
