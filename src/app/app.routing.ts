import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsListComponent } from "./routes/documents-list";
import { CreateDocumentComponent } from "./routes/create-document";
import { RoutesEnum } from "./core/enums/routes.enum";
import {EditDocumentComponent} from "./routes/edit-document";
import {AuthorizationComponent} from "./routes/authorization";

const routes: Routes = [
  {
    path: RoutesEnum.Home,
    component: DocumentsListComponent
  }, {
    path: RoutesEnum.CreateDocument,
    component: CreateDocumentComponent
  }, {
    path: RoutesEnum.EditDocument,
    component: EditDocumentComponent
  }, {
    path: RoutesEnum.EditDocument + '/:id',
    component: EditDocumentComponent
  }, {
    path: RoutesEnum.Authorization,
    component: AuthorizationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
