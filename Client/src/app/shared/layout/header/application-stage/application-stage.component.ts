import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-application-stage',
  templateUrl: './application-stage.component.html',
  styleUrls: ['./application-stage.component.css'],
})
export class ApplicationStageComponent {
  @Input() name: string = '';
  @Input() number: number = 0;
  @Input() completed: boolean | undefined = undefined;
}
