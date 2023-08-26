import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Компонент ввода изображения записи дневника
export class InputImageComponent {
  @Input() title: string = 'param'
  image: any = null;
  @Output() outputImage = new EventEmitter<any>();

  constructor() {}

  // Загрузка изображения при его вводе
  onChange(event: any) {
    this.image = event.target.files[0]
    this.outputImage.emit(this.image)
  }
}
