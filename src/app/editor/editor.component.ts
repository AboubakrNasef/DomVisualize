import { Component, OnInit, ViewChild, output } from '@angular/core';
import { NgxEditorModel, EditorComponent as ed } from 'ngx-monaco-editor-v2';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  textOutput = output<string>();
  @ViewChild('monaco') monaco!: ed;
  model!: NgxEditorModel;

  constructor() {}

  ngOnInit(): void {
    this._code = this.getCode();
    this.textOutput.emit(this.getCode());
  }
  editorOptions = {
    theme: 'vs-dark',
    language: 'html',
    autoClosingBrackets: false,
    renderValidationDecorations: true,
    minimap: { enabled: false },
  };

  private _code: string = '';

  get code(): string {
    return this._code;
  }
  set code(value: string) {
    this._code = value;
    this.htmlDoc = this.parser.parseFromString(this.code, 'text/html');
    this.textOutput.emit(this._code);
    //const model = monaco.editor.getModels()[0]; // Get the first model (assuming only one)
    // const markers = monaco.editor.getModelMarkers({ resource: model.uri });
  }

  getCode() {
    return `<html>
    <head>
     <title>
     Example of Paragraph tag
     </title>
     </head><body>
   <p>
    this is text <small>Small text</small>
    <u>this is u </u>
   </p>
     </body>
</html>`;
  }

  parser = new DOMParser();
  htmlDoc = this.parser.parseFromString(this.code, 'text/html');
}
