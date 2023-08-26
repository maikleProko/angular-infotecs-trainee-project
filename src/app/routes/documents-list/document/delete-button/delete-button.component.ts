import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from "../../../../core";

@Component({
  selector: 'delete-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

// Компонент для кнопки удаления записи дневника
export class DeleteButtonComponent {
  title: string = 'Delete'
  @Input() id: number = -1
  @Output() outputEventDelete = new EventEmitter<any>()

  constructor(
    private storage: StorageService
  ) {}

  // Генерация события удаления
  emitDelete(){
    this.outputEventDelete.emit()
  }

  // Удаление записи дневника
  public onClick(): void {
    this.storage.remove(this.id)
    this.emitDelete()
  }

}
