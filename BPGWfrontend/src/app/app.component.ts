import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  topics: any;
  title = 'BPGWfrontend';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(environment.baseUrl + '/api/topics')
      .subscribe(data => this.topics = data);
  }  
}
