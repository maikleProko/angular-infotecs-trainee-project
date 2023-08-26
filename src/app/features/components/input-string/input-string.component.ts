import {
  Component,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'input-string',
  templateUrl: './input-string.component.html',
  styleUrls: ['./input-string.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Компонент ввода текста записи дневника
export class InputStringComponent {
  @Input() title: string = 'param'
  @Input() type: string = 'text'
  @Input() text: string = ''
  @Output() outputText = new EventEmitter<string>();


  constructor() {}

  // Передача текста компоненту, уровнем выше
  handler(event: any) {
    this.text = event.target.value
    this.outputText.emit(this.text)
  }

}
