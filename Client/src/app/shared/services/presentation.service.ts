import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presentation } from '../models/presentation';
import { ApiConfigService } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class PresentationService {
  private readonly presentationsEndpoint = 'presentations';

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getPresentations(): Observable<Presentation[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationsEndpoint}`;
    return this.http.get<Presentation[]>(url);
  }

  getPresentation(id: number): Observable<Presentation> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationsEndpoint}/${id}`;
    return this.http.get<Presentation>(url);
  }

  createPresentation(presentation: Presentation): Observable<Presentation> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationsEndpoint}`;
    return this.http.post<Presentation>(url, presentation);
  }

  updatePresentation(
    id: number,
    presentation: Presentation
  ): Observable<Presentation> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationsEndpoint}/${id}`;
    return this.http.put<Presentation>(url, presentation);
  }

  deletePresentation(id: number): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationsEndpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
