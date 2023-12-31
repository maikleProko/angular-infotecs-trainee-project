import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CreateDocumentComponent } from './create-document.component';
import { CreateDocumentButtonComponent } from "./create-document-button";
import { FeaturesModule } from "../../features";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { ReactiveFormsModule } from "@angular/forms";
import { StorageService } from "../../core";

@NgModule({
  declarations: [
    CreateDocumentComponent,
    CreateDocumentButtonComponent
  ],
  imports: [
    BrowserModule,
    FeaturesModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [StorageService],
  bootstrap: [CreateDocumentComponent]
})
export class CreateDocumentModule { }
