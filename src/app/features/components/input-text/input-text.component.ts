import {
  Component,
  ChangeDetectionStrategy,
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

// Компонент ввода текста записи дневника
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

  // Метод для проверки на пустоту объекта текста каждую секунду до тех пор, пока не придут данные с компонента, уровнем выше
  checkInitialize() {
    setTimeout(()=>{
      if(!this.textData.length && Object.keys(JSON.parse(this.textData)).length === 0) {
        this.checkInitialize()
      } else {
        this.initializeEditor();
      }
    },500)
  }

  // Передача объекта текста компоненту, уровнем выше
  handler() {
    this.outputTextData.emit(this.textData)
  }

  // Инициализация поля ввода текста записи дневника
  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorElement.nativeElement,
      data: JSON.parse(this.textData),
      tools: {
        // ...
        underline: Underline
      },

      onChange: () => {
        this.editor.save().then(textData => {
          this.textData = textData
          this.handler()
        })
      }
    });
  }

  // Вывод объекта текста записи дневника
  showEditorTextData() {
    this.editor.save().then(textData => {
      console.dir(textData);
    })
  }
}
