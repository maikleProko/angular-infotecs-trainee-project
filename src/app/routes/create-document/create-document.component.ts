import { Component } from '@angular/core';

@Component({
  selector: 'create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['../../app.component.css', './create-document.component.css']
})
export class CreateDocumentComponent {
  textData: any = {}
  image: any = null

  constructor() {}

  getTextData(textData: any) {
    if(textData) {
      this.textData = JSON.stringify(textData)
    }
  }

  getImage(image: any) {
    if(image) {
      this.image = image
    }
  }

}
