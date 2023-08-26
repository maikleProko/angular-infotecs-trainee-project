import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputImageComponent {
  @Input() title: string = 'param'
  image: any = null;
  @Output() outputImage = new EventEmitter<any>();

  constructor() {}

  onChange(event: any) {
    this.image = event.target.files[0]
    console.log(this.image)
    this.outputImage.emit(this.image)
  }
}
