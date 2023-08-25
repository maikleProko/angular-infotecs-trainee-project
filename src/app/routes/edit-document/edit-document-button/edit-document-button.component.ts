import {Component, ChangeDetectionStrategy, OnDestroy, Input} from '@angular/core';
import { Router } from "@angular/router";
import {RoutesEnum} from "../../../core";
import {StorageService} from "../../../core";

@Component({
  selector: 'edit-document-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

export class EditDocumentButtonComponent {
  title: string = 'Save'
  @Input() id: number = -1
  @Input() textData: any = {}
  @Input() date: string = ''

  constructor(
    private router: Router
  ) {}

  onClick(): any {
    //StorageService.set(this.id, this.textData)
    this.router.navigate([RoutesEnum.Home]);
  }

}
