import { Injectable } from '@angular/core';
import { Document } from "../interfaces";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { ImageUploaderService } from "./image-uploader.service";

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  userName: string = 'user'

  constructor(
    private storage: AngularFireStorage,
    private imageUploader: ImageUploaderService,
    private db: AngularFireDatabase
  ) {}

  push(textData: any, image: any, handler: any): any{
    this.getDocuments((documents: any)=>{
      let id: number = StorageService.getAvailableId(documents)
      this.set(id, textData, image, handler)
    })
  }

  remove(id: number): any {
    this.db.object<Document>('/users/' + this.userName + '/documents/' + id).remove()
  }

  set(id: number, textData: any, inputImage: any, handler: any) {
    this.imageUploader.uploadImage(inputImage, id.toString(), this, (image: any) => {
      let document: Document = {
        id: id,
        date: StorageService.formatDate(new Date()),
        textData: JSON.parse(textData),
        image: image
      }
      this.db.object<Document>('/users/' + this.userName + '/documents/' + document.id)
        .update(document)
        .then(()=>{
          handler()
        })
    })
  }

  get(id: number, handler: any) {
    let ref = this.db.database.ref('/users/' + this.userName + '/documents/' + id)
    ref.get().then((document)=> {
      handler(document.val())
    })
  }

  getDocumentsOrderedDate(handler: any) {
    this.getDocuments((documents: any[])=>{
      handler(StorageService.getSortedDocumentsByDate(documents))
    })
  }

  private getDocuments(handler: any) {
    let ref = this.db.database.ref('/users/' + this.userName + '/documents/')
    ref.get().then((snapshot)=>{
      let documents: any[] = []
      for(const key in snapshot.val()) {
        documents.push(snapshot.val()[key])
      }
      handler(documents)
    })
  }

  private static isExistDocumentById(id: number, documents: any[]) {
    for(let document of documents) {
      if(document.id == id) {
        return true
      }
    }
    return false
  }

  private static getAvailableId(documents: any[]) {
    let id = 0;
    while(StorageService.isExistDocumentById(id, documents)) {
      id++
    }
    return id
  }

  private static getSortedDocumentsByDate(documents: any[]): any[] {
    return documents.sort((a, b) => {
      const dateA = StorageService.parseDateFromString(a.date);
      const dateB = StorageService.parseDateFromString(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private static parseDateFromString(dateString: string): Date {
    const [time, date] = dateString.split(' ');
    const [hours, minutes, seconds] = time.split(':');
    const [day, month, year] = date.split('.');
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds));
  }

  private static formatDate(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
  }
}
