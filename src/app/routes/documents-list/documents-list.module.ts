import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentsListComponent } from './documents-list.component';
import { CreateButtonComponent } from "./create-button";
import { DocumentComponent } from "./document";
import { DeleteButtonComponent } from "./document/delete-button";
import { EditButtonComponent } from "./document/edit-button";
import { FeaturesModule } from "../../features";

@NgModule({
  declarations: [
    DocumentsListComponent,
    DocumentComponent,
    CreateButtonComponent,
    DeleteButtonComponent,
    EditButtonComponent
  ],
  imports: [
    BrowserModule,
    FeaturesModule
  ],
  providers: [],
  bootstrap: [DocumentsListComponent]
})
export class DocumentsListModule { }
