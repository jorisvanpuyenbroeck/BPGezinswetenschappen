import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresentationDay } from '../models/presentationday';
import { ApiConfigService } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class PresentationdayService {
  private readonly presentationdaysEndpoint = 'presentationdays';

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getPresentationDays(): Observable<PresentationDay[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationdaysEndpoint}`;
    return this.http.get<PresentationDay[]>(url);
  }

  getPresentationDay(id: number): Observable<PresentationDay> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationdaysEndpoint}/${id}`;
    return this.http.get<PresentationDay>(url);
  }

  createPresentationDay(
    presentationDay: PresentationDay
  ): Observable<PresentationDay> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationdaysEndpoint}`;
    return this.http.post<PresentationDay>(url, presentationDay);
  }

  updatePresentationDay(
    id: number,
    presentationDay: PresentationDay
  ): Observable<PresentationDay> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationdaysEndpoint}/${id}`;
    return this.http.put<PresentationDay>(url, presentationDay);
  }

  deletePresentationDay(id: number): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.presentationdaysEndpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
