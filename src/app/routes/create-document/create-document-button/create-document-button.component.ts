import {Component, ChangeDetectionStrategy, OnDestroy, Input} from '@angular/core';
import { Router } from "@angular/router";
import {RoutesEnum} from "../../../core";
import {StorageService} from "../../../core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import firebase from "firebase/compat/app";
import storage = firebase.storage;

@Component({
  selector: 'create-document-button',
  template: '<common-button title={{title}} (click)="onClick()"></common-button>'
})

export class CreateDocumentButtonComponent {
  title: string = 'Create'
  @Input() textData: any = {}
  @Input() image: any = null

  constructor(
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  onClick(): any {
    //StorageService.push(this.textData)
    StorageService.pushTestImage(this.image, storage);
    //this.router.navigate([RoutesEnum.Home]);
  }

}
