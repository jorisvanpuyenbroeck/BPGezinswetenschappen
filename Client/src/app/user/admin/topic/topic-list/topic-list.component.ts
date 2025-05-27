import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../../shared/models/topic';
import { TopicService } from '../../../../shared/services/topic.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
})
export class AdminTopicListComponent implements OnInit {
  topics: Topic[] = [];
  topics$: Subscription = new Subscription();
  deleteTopic$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private topicService: TopicService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTopics();
  }

  ngOnDestroy(): void {
    this.topics$.unsubscribe();
  }

  getTopics() {
    this.topics$ = this.topicService
      .getTopics()
      .subscribe((result) => (this.topics = result));
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/topic/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/topic/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteTopic$ = this.topicService.deleteTopic(id).subscribe({
      next: (v) => this.getTopics(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
