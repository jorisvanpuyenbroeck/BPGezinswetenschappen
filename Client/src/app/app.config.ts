// api-config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root', // Make sure it's available globally
})
export class ApiConfigService {
    // apiBaseUrl = 'https://gwbpapi.azurewebsites.net/api/'; // Development URL
    apiBaseUrl = 'https://localhost:7026/api/'; // Development URL


    // You can add other configuration properties here
}
