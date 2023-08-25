import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef, Output, EventEmitter
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Underline from '@editorjs/underline';


@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputTextComponent implements AfterViewInit {
  @Input() title: string = 'param'
  @Input() type: string = 'text'
  @Input() textData: any = ''
  @Output() outputTextData = new EventEmitter<any>();
  isLoaded: boolean = false;


  // @ts-ignore
  @ViewChild('editor', { read: ElementRef }) editorElement: ElementRef;

  // @ts-ignore
  private editor: EditorJS;

  constructor() {}

  ngAfterViewInit(): void {
    this.checkInitialize()
  }

  checkInitialize() {
    setTimeout(()=>{
      if(!this.textData.length && Object.keys(JSON.parse(this.textData)).length === 0) {
        this.checkInitialize()
      } else {
        this.initializeEditor();
      }
    },500)
  }

  handler() {
    this.outputTextData.emit(this.textData)
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorElement.nativeElement,
      data: JSON.parse(this.textData),
      tools: {
        // ...
        underline: Underline
      },

      onChange: (api, event) => {
        this.editor.save().then(textData => {
          this.textData = textData
          this.handler()
        })
      }
    });
  }

  showEditorTextData() {
    this.editor.save().then(textData => {
      console.dir(textData);
    })
  }

}
