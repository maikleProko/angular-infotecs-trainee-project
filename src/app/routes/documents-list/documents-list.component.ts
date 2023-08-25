import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../core";

@Component({
  selector: 'documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['../../app.component.css', './documents-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsListComponent implements OnInit{
  public documents: any[] = []
  private maxCount: number = 4
  public count: number = this.maxCount

  constructor(
    private router: Router,
    private storage: StorageService
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
    this.storage.getDocuments((documents: any) => {
      this.documents = documents
      console.log(documents)
    })
     //this.getDocumentsByCount(this.count, StorageService.getDocuments())
  }

  ngOnInit(): void {
    this.updateDocuments()
  }

}
