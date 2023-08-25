import { Injectable } from '@angular/core';
import {formatDate} from "@angular/common";
import { Document } from "../interfaces";
import {finalize} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export abstract class StorageService {

  public static pushFire(textData: any, image: any): any{
    let documents = this.getDocuments()
    let document: Document = {
      id: this.getAvailableId(documents),
      date: this.formatDate(new Date()),
      textData: JSON.parse(textData),
      image: null
    }
    documents.push(document)

    this.updateDocuments(documents)
  }

  public static pushTestImage(image: any, storage: any) {
    var n = Date.now();
    const path = `RoomsImages/${n}`;
    const ref = storage.ref(path);

    const task = storage.upload(`RoomsImages/${n}`, image);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let downloadURL = ref.getDownloadURL();
          downloadURL.subscribe((url: string) => {
            if (url) {
              console.log(url);
            }
          });
        })
      )
      .subscribe((url: string) => {
        if (url) {
          console.log(url);
        }
      });
  }


  public static push(textData: any): any{
    let documents = this.getDocuments()
    let document: Document = {
      id: this.getAvailableId(documents),
      date: this.formatDate(new Date()),
      textData: JSON.parse(textData),
      image: null
    }
    documents.push(document)

    this.updateDocuments(documents)
  }

  public static remove(id: number): any {
    let documents = this.getDocuments().filter((document: any) => document.id !== id);
    this.updateDocuments(documents)
  }

  public static getDocuments() {
    let documentsJSON: string | null = localStorage.getItem('documents');
    let documents: Document[] = []
    if(documentsJSON != null) {
      documents = JSON.parse(documentsJSON)
      return documents
    } else {
      localStorage.setItem('documents', JSON.stringify(documents));
      return []
    }
  }

  public static get(id: number) {
    let documents = this.getDocuments()
    for(let document of documents) {
      if(document.id == id) {
        return document
      }
    }
    return null
  }

  public static set(id: number, textData: any) {
    let documents = this.getDocuments().map((document: any) => document.id == id ?
      {
        id: id,
        date: this.formatDate(new Date()),
        textData: JSON.parse(textData),
        image: document.image
      }
      : document
    )
    this.updateDocuments(documents)
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
    while(this.isExistDocumentById(id, documents)) {
      id++
    }
    return id
  }


  private static updateDocuments(documents: any[]) {
    localStorage.setItem('documents', JSON.stringify(this.getSortedDocumentsByDate(documents)));
  }


  private static getSortedDocumentsByDate(documents: any[]): any[] {
    return documents.sort((a, b) => {
      const dateA = this.parseDateFromString(a.date);
      const dateB = this.parseDateFromString(b.date);
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
