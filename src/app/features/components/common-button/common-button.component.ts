import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'common-button',
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommonButtonComponent {
  @Input() title: string = 'Button'

  constructor() {}

  @Input() onClick() {

  }

}
