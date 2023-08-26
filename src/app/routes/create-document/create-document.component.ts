import {Component, Input, OnInit} from '@angular/core';
import {RoutesEnum, StorageService} from "../../core";
import {Router} from "@angular/router";

@Component({
  selector: 'create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['../../app.component.css', './create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
  textData: any = "{\"0\": \"0\"}"
  @Input() image: File = new File([], '', undefined)
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    if(this.storage.userName == '') {
      this.router.navigate([RoutesEnum.Authorization]);
    }
  }

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
