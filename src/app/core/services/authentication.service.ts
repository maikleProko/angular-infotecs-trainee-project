import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, Observable, throwError } from 'rxjs';
import { FError } from "../types/";

@Injectable({
  providedIn: 'root'
})

// Сервис для аутентификации пользователя
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  // Авторизация пользователя
  login(name: string, password: string): Observable<any> {
    console.log(name)
    return from(this.auth.signInWithEmailAndPassword(
      name, password
    )).pipe(
      catchError((error: FError) =>
        throwError(() => new Error(error.message))
      )
    );
  }
}

