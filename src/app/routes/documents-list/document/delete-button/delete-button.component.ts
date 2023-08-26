import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from "../../../../core";

@Component({
  selector: 'delete-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

export class DeleteButtonComponent {
  title: string = 'Delete'
  @Input() id: number = -1
  @Output() outputEventDelete = new EventEmitter<any>()

  constructor(
    private storage: StorageService
  ) {}

  emitDelete(){
    this.outputEventDelete.emit()
  }

  public onClick(): void {
    this.storage.remove(this.id)
    this.emitDelete()
  }

}
