import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Topic } from '../../../../shared/models/topic';
import { TopicService } from '../../../../shared/services/topic.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
})
export class StudentTopicListComponent implements OnInit {
  // local
  public topics: Topic[] = [];
  public user: User = {} as User;

  // Subscriptions
  topicsSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();

  constructor(
    public topicService: TopicService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTopics();
    this.userSubscription = this.userService.userStore$.subscribe((user) => {
      console.log('topic list component initialized');
      // Update the local student property
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.topicsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  getTopics() {
    this.topicsSubscription = this.topicService
      .getTopics()
      .subscribe((result) => (this.topics = result));
  }

  toggleFavourite(topicId: number) {
    if (this.user.application?.topics) {
      // Ensure application and topics are defined
      if (this.isFavourite(topicId)) {
        // If the topic is already in the topics array, remove it
        const index = this.user.application.topics.indexOf(topicId);
        if (index !== -1) {
          this.user.application.topics.splice(index, 1);
        }
      } else {
        // If the topic is not in the topics array, add it
        this.user.application.topics.push(topicId);
      }
    }
  }

  isFavourite(topicId: number): boolean {
    return this.user.application?.topics?.includes(topicId) || false; // Safely check if the topic is in the array
  }

  saveTopics() {
    if (this.userService.checkApplicationProgress(this.user, 'topics')) {
      if (this.user.application) {
        // Ensure application is defined
        this.user.application.topicsSaved = true;
      }
      console.log('saved', this.user || 'student triggered');
      // this.student$.subscribe(student => {
      //   this.topicService.saveTopics(student.application.topics);
    }
  }
}
