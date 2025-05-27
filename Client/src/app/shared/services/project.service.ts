import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectCreateDto, ProjectUpdateDto } from '../models/project'; // Import Project and DTO interfaces
import { ApiConfigService } from '../../app.config'; // Inject the config service

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly projectsEndpoint = 'projects'; // API endpoint (relative path)

  constructor(
    private httpClient: HttpClient,
    private apiConfigService: ApiConfigService // Inject the config service
  ) {}

  getProjects(): Observable<Project[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.projectsEndpoint}`;
    return this.httpClient.get<Project[]>(url);
  }

  getProjectById(id: number): Observable<Project> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.projectsEndpoint}/${id}`;
    return this.httpClient.get<Project>(url);
  }

  postProjectAsAdmin(project: Project): Observable<Project> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.projectsEndpoint}`;
    return this.httpClient.post<Project>(url, project);
  }

  putProjectAsAdmin(id: number, project: Project): Observable<Project> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.projectsEndpoint}/${id}`;
    return this.httpClient.put<Project>(url, project);
  }
  postProject(project: ProjectCreateDto): Observable<any> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.projectsEndpoint}`;
    return this.httpClient.post(url, project);
  }

  putProject(project: ProjectUpdateDto): Observable<any> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.projectsEndpoint}`;
    return this.httpClient.put(url, project);
  }

  deleteProject(id: number): Observable<Project> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.projectsEndpoint}/${id}`;
    return this.httpClient.delete<Project>(url);
  }
}
