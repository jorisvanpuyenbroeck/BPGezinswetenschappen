import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic, TopicCreateDto, TopicUpdateDto } from '../models/topic'; // Import Topic and DTO interfaces
import { ApiConfigService } from '../../app.config'; // Inject the config service

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private readonly topicsEndpoint = 'topics'; // API endpoint (relative path)

  constructor(
    private httpClient: HttpClient,
    private apiConfigService: ApiConfigService // Inject the config service
  ) {}

  getTopics(): Observable<Topic[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.topicsEndpoint}`;
    return this.httpClient.get<Topic[]>(url);
  }

  getTopicById(topicId: number): Observable<Topic> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.topicsEndpoint}/${topicId}`;
    return this.httpClient.get<Topic>(url);
  }
  postTopic(dto: TopicCreateDto): Observable<Topic> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.topicsEndpoint}`;
    return this.httpClient.post<Topic>(url, dto);
  }
  putTopic(id: number, topic: TopicUpdateDto): Observable<Topic> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.topicsEndpoint}/${id}`;
    return this.httpClient.put<Topic>(url, topic);
  }

  deleteTopic(id: number): Observable<Topic> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.topicsEndpoint}/${id}`;
    return this.httpClient.delete<Topic>(url);
  }
}
