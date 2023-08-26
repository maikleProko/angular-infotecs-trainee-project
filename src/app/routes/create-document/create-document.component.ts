import { Component, Input } from '@angular/core';

@Component({
  selector: 'create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['../../app.component.css', './create-document.component.css']
})
export class CreateDocumentComponent {
  textData: any = "{\"0\": \"0\"}"
  @Input() image: File = new File([], '', undefined)
  isLoading: boolean = false;

  constructor() {}

  // Изменение объекта текста записи дневника с приведением его к строке JSON формата
  setTextData(textData: any) {
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
}
