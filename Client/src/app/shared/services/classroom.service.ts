import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom';
import { ApiConfigService } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class ClassroomService {
  private readonly classroomsEndpoint = 'classrooms';

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getClassrooms(): Observable<Classroom[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.classroomsEndpoint}`;
    return this.http.get<Classroom[]>(url);
  }

  getClassroom(id: number): Observable<Classroom> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.classroomsEndpoint}/${id}`;
    return this.http.get<Classroom>(url);
  }

  createClassroom(classroom: Classroom): Observable<Classroom> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.classroomsEndpoint}`;
    return this.http.post<Classroom>(url, classroom);
  }

  updateClassroom(id: number, classroom: Classroom): Observable<Classroom> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.classroomsEndpoint}/${id}`;
    return this.http.put<Classroom>(url, classroom);
  }

  deleteClassroom(id: number): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.classroomsEndpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
