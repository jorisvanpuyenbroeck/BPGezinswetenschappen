import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Topic } from '../../../../shared/models/topic';
import { TopicDto } from '../../../../shared/models/dto/topic.dto';
import { TopicService } from '../../../../shared/services/topic.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css'],
})
export class AdminTopicFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  topicId: number = 0;
  topic: Topic = { topicId: 0, name: '', description: '' };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  topic$: Subscription = new Subscription();
  postTopic$: Subscription = new Subscription();
  putTopic$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private topicService: TopicService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.topicId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.topicId != null && this.topicId > 0) {
      this.topic$ = this.topicService
        .getTopicById(this.topicId)
        .subscribe((result) => (this.topic = result));
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.topic$.unsubscribe();
    this.postTopic$.unsubscribe();
    this.putTopic$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      const dto: TopicDto = {
        name: this.topic.name,
        description: this.topic.description,
      };

      this.postTopic$ = this.topicService.postTopic(dto).subscribe({
        next: (v) => this.router.navigateByUrl('/admin/topic'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.putTopic$ = this.topicService
        .putTopic(this.topicId, this.topic)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/topic'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
  }
  goBack() {
    this.location.back();
  }
}
