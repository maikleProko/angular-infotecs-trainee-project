import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorizationComponent } from './authorization.component';
import { FeaturesModule } from "../../features";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { ReactiveFormsModule } from "@angular/forms";
import { StorageService } from "../../core";
import { LoginButtonComponent } from "./login-button";
import { InputStringComponent } from "../../features/components/input-string";

@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginButtonComponent,
    InputStringComponent
  ],
  imports: [
    BrowserModule,
    FeaturesModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [StorageService],
  bootstrap: [AuthorizationComponent]
})
export class AuthorizationModule { }
