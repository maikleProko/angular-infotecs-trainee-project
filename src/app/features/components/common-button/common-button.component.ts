import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'common-button',
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Компонент кнопки
export class CommonButtonComponent {
  @Input() title: string = 'Button'

  constructor() {}

  @Input() onClick() {

  }
}
