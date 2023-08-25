import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CreateDocumentComponent } from './create-document.component';
import {CreateDocumentButtonComponent} from "./create-document-button";
import {FeaturesModule} from "../../features";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/compat/storage";

import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";

@NgModule({
  declarations: [
    CreateDocumentComponent,
    CreateDocumentButtonComponent
  ],
  imports: [
    BrowserModule,
    FeaturesModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [],
  bootstrap: [CreateDocumentComponent]
})
export class CreateDocumentModule { }
