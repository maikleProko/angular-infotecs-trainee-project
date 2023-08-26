import { Component, Input } from '@angular/core';

@Component({
  selector: 'authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['../../app.component.css', './authorization.component.css']
})


// Компонент авторизации пользователя
export class AuthorizationComponent {
  userName: string = ''
  password: string = ''
  isLoading: boolean = false;

  constructor() {}

  // Изменение имени пользователя
  setUserName(userName: string) {
    if(userName) {
      this.userName = userName
    }
  }

  // Изменение пароля
  setPassword(password: string) {
    if(password) {
      this.password = password
    }
  }

  // Изменение статуса загрузки
  setLoading() {
    this.isLoading = true
  }
}
