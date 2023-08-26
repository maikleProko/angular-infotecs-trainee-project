import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import EditorJS from "@editorjs/editorjs";

@Component({
  selector: 'output-text',
  templateUrl: './output-text.component.html',
  styleUrls: ['./output-text.component.css', '../../../app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OutputTextComponent implements AfterViewInit {
  @Input() textData: any = {}
  // @ts-ignore
  @ViewChild('editor', { read: ElementRef }) viewerElement: ElementRef;

  // @ts-ignore
  private viewer: EditorJS;

  ngAfterViewInit(): void {
    this.initializeEditor();
    OutputTextComponent.initTextFieldStyle();
  }

  private initializeEditor() {
    this.viewer = new EditorJS({
      minHeight: 81,
      holder: this.viewerElement.nativeElement,
      data: this.textData,
      readOnly: true
    });
  }

  private static initTextFieldStyle(): void {
    const linkElement = document.createElement('style');
    linkElement.innerText = '.ce-block__content {\n max-width: 953px;\n}'
    document.head.appendChild(linkElement);
  }

  showViewerTextData() {
    this.viewer.save().then(textData => {
      console.dir(textData);
    })
  }

  constructor() {}

}
