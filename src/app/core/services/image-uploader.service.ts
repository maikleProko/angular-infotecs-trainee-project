import { Injectable } from "@angular/core";
import { finalize } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})

// Сервис для загрузки изображений
export class ImageUploaderService {

  constructor(
    private storage: AngularFireStorage,
  ) {}

  // Загрузка изображений
  uploadImage(image: any, title: string, getter: any, handler: any) {
    if(image) {
      if(image.name == 'no-changed') {
        this.useCurrentImage(title, getter, handler)
      } else {
        this.useNewImage(image, title, getter, handler)
      }
    } else {
      this.useEmptyImage(handler)
    }
  }

  // Использование уже существующего изображения
  useCurrentImage(title: string, getter: any, handler: any) {
    getter.get(Number(title), (document: any)=>{
      handler(document.image)
    })
  }

  // Использование нового изображения
  useNewImage(image: any, title: string, getter: any, handler: any) {
    const path = `images/${getter.userName}/${title}`;
    this.storage.upload(path, image).snapshotChanges().pipe( finalize(() => {
      this.storage.ref(path).getDownloadURL().subscribe((url: string) => url ? handler(url) : handler(''));
    })).subscribe();
  }

  // Использоание пустого изображения
  useEmptyImage(handler: any) {
    handler('')
  }
}
