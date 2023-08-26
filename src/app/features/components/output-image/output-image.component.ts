import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'output-image',
  templateUrl: './output-image.component.html',
  styleUrls: ['./output-image.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Компонент вывода изображения записи дневника
export class OutputImageComponent {

  @Input() image: string | undefined = undefined;

  constructor() {}

  public onClick(): void {

  }
}
