import { Injectable } from "@angular/core";
import { finalize } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})

export class ImageUploaderService {

  constructor(
    private storage: AngularFireStorage,
  ) {}

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

  useCurrentImage(title: string, getter: any, handler: any) {
    getter.get(Number(title), (document: any)=>{
      handler(document.image)
    })
  }

  useNewImage(image: any, title: string, getter: any, handler: any) {
    const path = `images/${getter.userName}/${title}`;
    this.storage.upload(path, image).snapshotChanges().pipe( finalize(() => {
      this.storage.ref(path).getDownloadURL().subscribe((url: string) => url ? handler(url) : handler(''));
    })).subscribe();
  }

  useEmptyImage(handler: any) {
    handler('')
  }
}
