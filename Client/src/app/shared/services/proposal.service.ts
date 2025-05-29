import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Proposal,
  ProposalCreateDto,
  ProposalUpdateDto,
} from '../models/proposal'; // Import your Proposal models
import { ApiConfigService } from '../../app.config'; // Import the config service
import { map } from 'rxjs/operators';

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
    return this.httpClient.get<Proposal[]>(url).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response.map((proposal) => {
            if (proposal.topics && (proposal.topics as any)['$values']) {
              proposal.topics = (proposal.topics as any)['$values'];
            }
            return proposal;
          });
        }
        return response;
      })
    );
  }
  getProposalById(id: number): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/${id}`;
    return this.httpClient.get<Proposal>(url).pipe(
      map((response) => {
        // Handle potential $id and $values format from API
        if (
          response &&
          response.topics &&
          (response.topics as any)['$values']
        ) {
          response.topics = (response.topics as any)['$values'];
        }
        return response;
      })
    );
  }

  getProposalsByTopics(topicIds: number[]): Observable<Proposal[]> {
    const queryString = topicIds.map((id) => `topicIds=${id}`).join('&');
    const apiUrl = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/by-topic?${queryString}`;
    return this.httpClient.get<Proposal[]>(apiUrl);
  }
  postProposal(proposal: ProposalCreateDto): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}`;
    console.log('POST request to', url, 'with data:', proposal);
    return this.httpClient.post<Proposal>(url, proposal);
  }

  putProposal(id: number, proposal: ProposalUpdateDto): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/${id}`;
    console.log('PUT request to', url, 'with data:', proposal);
    return this.httpClient.put<Proposal>(url, proposal).pipe(
      map((response) => {
        console.log('PUT response:', response);
        return response;
      })
    );
  }

  deleteProposal(id: number): Observable<Proposal> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.proposalsEndpoint}/${id}`;
    return this.httpClient.delete<Proposal>(url);
  }
}
