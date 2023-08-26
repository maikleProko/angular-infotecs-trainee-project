import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['../../app.component.css', './create-document.component.css']
})
export class CreateDocumentComponent implements OnInit{
  textData: any = "{\"0\": \"0\"}"
  @Input() image: File = new File([], '', undefined)

  constructor() {}

  ngOnInit(): void {

  }

  getTextData(textData: any) {
    if(textData) {
      this.textData = JSON.stringify(textData)
    }
  }

  getImage(image: File) {
    if(image) {
      this.image = image
    }
  }

  getFile(): File {
    return this.image
  }
}
