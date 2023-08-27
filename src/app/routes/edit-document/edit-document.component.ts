import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RoutesEnum, StorageService } from "../../core";
import { Document } from "../../core/types";

@Component({
  selector: 'edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['../../app.component.css', './edit-document.component.css']
})
export class EditDocumentComponent implements OnInit, OnDestroy {
  id: number = -1
  textData: any = {}
  date: string = ''
  image: any = null
  private sub: any;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private ref: ChangeDetectorRef
  ) {}

  // Получение имеющихся данных записи дневника
  ngOnInit() {
    if(this.storage.userName == '') {
      this.router.navigate([RoutesEnum.Authorization]);
    }
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.storage.get(this.id, (document: Document) => {
        if(document == null) {
          this.router.navigate([RoutesEnum.Home]);
        } else {
          this.textData = JSON.stringify(document.textData);
          this.date = document.date;
          this.image = new File([], 'no-changed', undefined)
          console.log(document)
          this.ref.markForCheck();
        }
      });
    })
  }

  // Изменение объекта текста записи дневника с приведением его к строке JSON формата
  setTextData(textData: string) {
    if(textData) {
      this.textData = JSON.stringify(textData)
    }
  }

  // Изменение изображения
  setImage(image: File) {
    if(image) {
      this.image = image
    }
  }

  // Изменение статуса загрузки
  setLoading() {
    this.isLoading = true
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
