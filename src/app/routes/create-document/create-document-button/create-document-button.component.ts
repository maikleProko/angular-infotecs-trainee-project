import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../core";
import { StorageService } from "../../../core";

@Component({
  selector: 'create-document-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

// Компонент для кнопки создания записи
export class CreateDocumentButtonComponent {
  title: string = 'Create'
  @Input() textData: any = {}
  @Input() image: File = new File([], '', undefined)

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  // Создание записи дневника, после чего перенаправление на страницу списка записей дневника
  onClick(): any {
    this.storage.push(this.textData, this.image, () => {
      this.router.navigate([RoutesEnum.Home]);
    })
  }

}
