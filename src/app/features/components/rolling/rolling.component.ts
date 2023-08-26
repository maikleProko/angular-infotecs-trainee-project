import {
  Component,
  ChangeDetectionStrategy,
  Input, OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'rolling',
  templateUrl: './rolling.component.html',
  styleUrls: ['./rolling.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Компонент вывода фрагмента загрузки
export class RollingComponent implements OnChanges{

  @Input() isLoading: boolean = false

  constructor () {}

  // Отображение загрузки
  show(isLoading: boolean) {
    if(isLoading) {
      document.getElementsByClassName('rolling-background')[0].removeAttribute('hidden')
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.show(this.isLoading)
  }
}
