import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../core";

@Component({
  selector: 'create-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

export class CreateButtonComponent {
  title: string = 'Create'

  constructor(
    private router: Router
  ) {}


  public onClick(): void {
    this.router.navigate([RoutesEnum.CreateDocument]);
  }

}
