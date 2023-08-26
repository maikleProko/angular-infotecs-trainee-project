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

  // Ввод изображения
  onChange(event: any) {
    document.getElementsByClassName('before-upload-field')[0].setAttribute("hidden", "hidden")
    document.getElementsByClassName('after-upload-field')[0].removeAttribute('hidden')
    this.image = event.target.files[0]
    this.outputImage.emit(this.image)
  }
}
