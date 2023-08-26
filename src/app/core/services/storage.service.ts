import { Injectable } from '@angular/core';
import {formatDate} from "@angular/common";
import { Document } from "../interfaces";
import {finalize} from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private userName: string = 'user'


  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {}


  uploadImage(image: any, title: string, handler: any) {
    if(image) {
      if(image.name == 'no-changed') {
        this.get(Number(title), (document: any)=>{
          handler(document.image)
        })
      }
      else {
        const path = `images/${this.userName}/${title}`;
        const ref = this.storage.ref(path);

        const task = this.storage.upload(path, image);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              let downloadURL = ref.getDownloadURL();
              downloadURL.subscribe((url: string) => {
                if (url) {
                  handler(url)
                  console.log(url);
                }
              });
            })
          )
          // @ts-ignore
          .subscribe((url: string) => {
            if (url) {
              console.log(url);
            }
          });
      }
    }
    else {
      handler('')
    }

  }

  push(textData: any, image: any, handler: any): any{
    this.getDocuments((documents: any)=>{
      let id: number = this.getAvailableId(documents)
      this.set(id, textData, image, handler)
    })
  }

  remove(id: number): any {
    this.db.object<Document>('/users/' + this.userName + '/documents/' + id).remove()
  }

  getDocuments(handler: any) {
    let ref = this.db.database.ref('/users/' + this.userName + '/documents/')
    ref.get().then((snapshot)=>{
      let documents: any[] = []
      for(const key in snapshot.val()) {
        documents.push(snapshot.val()[key])
      }
      handler(documents)
    })
  }

  getDocumentsOrderedDate(handler: any) {
    this.getDocuments((documents: any[])=>{
      handler(this.getSortedDocumentsByDate(documents))
    })
  }

  get(id: number, handler: any) {
    let ref = this.db.database.ref('/users/' + this.userName + '/documents/' + id)
    ref.get().then((document)=> {
      handler(document.val())
    })
  }

  set(id: number, textData: any, inputImage: any, handler: any) {
    this.uploadImage(inputImage, id.toString(), (image: any) => {

      let document: Document = {
        id: id,
        date: this.formatDate(new Date()),
        textData: JSON.parse(textData),
        image: image
      }
      console.log("updated-document", document)

      this.db.object<Document>('/users/' + this.userName + '/documents/' + document.id)
        .update(document)
        .then(()=>{
          handler()
        })
    })

  }


  private isExistDocumentById(id: number, documents: any[]) {
    for(let document of documents) {
      if(document.id == id) {
        return true
      }
    }
    return false
  }

  private getAvailableId(documents: any[]) {
    let id = 0;
    while(this.isExistDocumentById(id, documents)) {
      id++
    }
    return id
  }



  private getSortedDocumentsByDate(documents: any[]): any[] {
    return documents.sort((a, b) => {
      const dateA = this.parseDateFromString(a.date);
      const dateB = this.parseDateFromString(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private parseDateFromString(dateString: string): Date {
    const [time, date] = dateString.split(' ');
    const [hours, minutes, seconds] = time.split(':');
    const [day, month, year] = date.split('.');
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds));
  }

  private formatDate(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
  }

  public setUserName(userName: string) {
    this.userName = userName
  }

}
