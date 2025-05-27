import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slot } from '../models/slot';
import { ApiConfigService } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class SlotService {
  private readonly slotsEndpoint = 'slots';

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getSlots(): Observable<Slot[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.slotsEndpoint}`;
    return this.http.get<Slot[]>(url);
  }

  getSlot(id: number): Observable<Slot> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.slotsEndpoint}/${id}`;
    return this.http.get<Slot>(url);
  }

  createSlot(slot: Slot): Observable<Slot> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.slotsEndpoint}`;
    return this.http.post<Slot>(url, slot);
  }

  updateSlot(id: number, slot: Slot): Observable<Slot> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.slotsEndpoint}/${id}`;
    return this.http.put<Slot>(url, slot);
  }

  deleteSlot(id: number): Observable<void> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.slotsEndpoint}/${id}`;
    return this.http.delete<void>(url);
  }
}
