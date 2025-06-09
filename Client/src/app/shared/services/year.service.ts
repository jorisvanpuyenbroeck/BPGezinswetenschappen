import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Year, YearCreateDto, YearUpdateDto } from '../models/year';
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

  createYear(year: YearCreateDto): Observable<Year> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}`;
    return this.http.post<Year>(url, year);
  }

  updateYear(id: number, year: YearUpdateDto): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}/${id}`;
    return this.http.put<void>(url, year);
  }

  deleteYear(id: number): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.yearsEndpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
