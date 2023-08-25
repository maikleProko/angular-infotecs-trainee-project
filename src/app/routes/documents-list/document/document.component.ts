import {Component, ChangeDetectionStrategy, OnDestroy, NgModule, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DeleteButtonComponent} from "./delete-button";

@Component({
  selector: 'document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css', '../../../app.component.css']
})


export class DocumentComponent {
  @Input() id: number = -1;
  @Input() date: string = '00.00.0000';
  @Input() textData: any = {};
  @Input() image: string | undefined;
  @Input() order: number = -1;
  @Input() count: number = -1;
  @Output() outputEventUpdate = new EventEmitter<any>();
  @Output() outputEventScroll = new EventEmitter<any>();

  emitUpdate() {
    this.outputEventUpdate.emit()
  }

  emitScroll() {
    if(this.order == this.count - 1) {
      this.outputEventScroll.emit()
    }
  }


  constructor() {}



}
