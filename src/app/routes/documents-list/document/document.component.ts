import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css', '../../../app.component.css']
})

// Компонент записи дневника
export class DocumentComponent {
  @Input() id: number = -1;
  @Input() date: string = '00.00.0000';
  @Input() textData: any = {};
  @Input() image: string | undefined;
  @Input() order: number = -1;
  @Input() count: number = -1;
  @Output() outputEventUpdate = new EventEmitter<any>();
  @Output() outputEventScroll = new EventEmitter<any>();

  // Генерация события обновления для списка записей при удалении текущей записи
  emitUpdate() {
    this.outputEventUpdate.emit()
  }

  // Генерация события для обновления количества записей в списке записей
  emitScroll() {
    if(this.order == this.count - 1) {
      this.outputEventScroll.emit()
    }
  }

  constructor() {}

}
