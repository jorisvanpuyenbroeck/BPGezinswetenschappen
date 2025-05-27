import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamPeriod } from '../models/examperiod';
import { ApiConfigService } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class ExamperiodService {
  private readonly examperiodsEndpoint = 'examperiods';

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getExamPeriods(): Observable<ExamPeriod[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.examperiodsEndpoint}`;
    return this.http.get<ExamPeriod[]>(url);
  }

  getExamPeriod(id: number): Observable<ExamPeriod> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.examperiodsEndpoint}/${id}`;
    return this.http.get<ExamPeriod>(url);
  }

  createExamPeriod(examPeriod: ExamPeriod): Observable<ExamPeriod> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.examperiodsEndpoint}`;
    return this.http.post<ExamPeriod>(url, examPeriod);
  }

  updateExamPeriod(id: number, examPeriod: ExamPeriod): Observable<ExamPeriod> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.examperiodsEndpoint}/${id}`;
    return this.http.put<ExamPeriod>(url, examPeriod);
  }

  deleteExamPeriod(id: number): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.examperiodsEndpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
