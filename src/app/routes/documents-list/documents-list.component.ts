import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {RoutesEnum, StorageService} from "../../core";

@Component({
  selector: 'documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['../../app.component.css', './documents-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Компонент списка записей дневника
export class DocumentsListComponent implements OnInit {
  public documents: any[] = []
  private maxCount: number = 4
  public count: number = this.maxCount
  outputEventUpdate = new EventEmitter<any>();

  constructor(
    private router: Router,
    private storage: StorageService,
    private ref: ChangeDetectorRef
  ) {}

  // Получение записей определенного количества
  getDocumentsByCount(count: number, documents: any[]) {
    let arr = []
    for(let i = 0; i < count && i < documents.length; i++) {
      arr.push(documents[i])
    }
    return arr
  }

  // Обновление количества отображаемых записей
  updateDocumentsCount() {
    this.count += this.maxCount;
    this.updateDocuments();
  }

  // Обновление записей
  updateDocuments() {
    this.storage.getDocumentsOrderedDate((documents: any[]) => {
      this.documents = this.getDocumentsByCount(this.count, documents)
      console.log(this.documents)
      this.ref.markForCheck();
    })
  }

  ngOnInit(): void {
    if(this.storage.userName == '') {
      this.router.navigate([RoutesEnum.Authorization]);
    }
    this.updateDocuments()
  }
}
