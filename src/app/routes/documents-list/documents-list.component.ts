import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../core";
import {count} from "rxjs";

@Component({
  selector: 'documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['../../app.component.css', './documents-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
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

  getDocumentsByCount(count: number, documents: any[]) {
    let arr = []
    for(let i = 0; i < count && i < documents.length; i++) {
      arr.push(documents[i])
    }
    return arr
  }

  updateDocumentsCount() {
    this.count += this.maxCount;
    this.updateDocuments();
  }

  updateDocuments() {
    this.storage.getDocumentsOrderedDate((documents: any[]) => {
      this.documents = this.getDocumentsByCount(this.count, documents)
      console.log(this.documents)
      this.ref.markForCheck();
    })
  }

  ngOnInit(): void {
    this.updateDocuments()
  }

}
