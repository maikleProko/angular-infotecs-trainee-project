import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditDocumentComponent } from './edit-document.component';
import { EditDocumentButtonComponent } from "./edit-document-button";
import { FeaturesModule } from "../../features";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    EditDocumentComponent,
    EditDocumentButtonComponent
  ],
  imports: [
    BrowserModule,
    FeaturesModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [EditDocumentComponent]
})
export class EditDocumentModule { }
