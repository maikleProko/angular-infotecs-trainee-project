import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../core";
import { StorageService } from "../../../core";

@Component({
  selector: 'edit-document-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

// Компонент для кнопки изменения записи
export class EditDocumentButtonComponent {
  title: string = 'Save'
  @Input() id: number = -1
  @Input() textData: any = {}
  @Input() date: string = ''
  @Input() image: File = new File([], 'no-changed', undefined)
  @Output() load = new EventEmitter<any>();

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  // Изменение записи дневника, после чего перенаправление на страницу списка записей дневника
  onClick(): any {
    this.load.emit();
    this.storage.set(this.id, this.textData, this.image, () => {
      this.router.navigate([RoutesEnum.Home]);
    })
    //StorageService.set(this.id, this.textData)
  }

}
