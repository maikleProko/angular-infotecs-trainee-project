import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../core";

@Component({
  selector: 'create-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

// Компонент для кнопки перенаправления на страницу создания записи дневника
export class CreateButtonComponent {
  title: string = 'Create'

  constructor(
    private router: Router
  ) {}

  // Перенаправление на страницу создания записи дневника
  public onClick(): void {
    this.router.navigate([RoutesEnum.CreateDocument]);
  }

}
