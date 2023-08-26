import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../../core";

@Component({
  selector: 'edit-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

export class EditButtonComponent {
  public title: string = 'Edit';
  @Input() id: number = -1;

  constructor(
    private router: Router
  ) {}

  public onClick(): void {
    this.router.navigate([RoutesEnum.EditDocument + '/' +this.id]);
  }

}
