import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../core";
import { StorageService } from "../../../core";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'login-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

// Компонент для кнопки авторизации пользователя
export class LoginButtonComponent {
  title: string = 'Login'
  @Input() userName: string = ''
  @Input() password: string = ''
  @Output() load = new EventEmitter<any>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private storage: StorageService
  ) {}

  // Авторизация пользователя
  onClick(): any {
    this.load.emit();
    console.log(this.userName)
    this.authenticationService.login(this.userName, this.password).subscribe({
      next: () => {
        this.storage.userName = this.userName.replace('@','').replace('.','')
        this.router.navigate([RoutesEnum.Home])
      },
      error: () => {
        alert('Error, repeat the input')
        this.router.navigate([RoutesEnum.Home])
      }
    });
  }

}
