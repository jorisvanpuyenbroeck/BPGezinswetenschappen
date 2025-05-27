import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Year } from '../models/year';
import { ApiConfigService } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class YearService {
  private readonly yearsEndpoint = 'years';

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getYears(): Observable<Year[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}`;
    return this.http.get<Year[]>(url);
  }

  getYear(id: number): Observable<Year> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}/${id}`;
    return this.http.get<Year>(url);
  }

  createYear(year: Year): Observable<Year> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}`;
    return this.http.post<Year>(url, year);
  }

  updateYear(id: number, year: Year): Observable<Year> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}/${id}`;
    return this.http.put<Year>(url, year);
  }

  deleteYear(id: number): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
