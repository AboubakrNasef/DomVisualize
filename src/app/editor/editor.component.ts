import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorComponent as ed } from 'ngx-monaco-editor-v2';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  ngOnInit(): void {}
  editorOptions = {
    theme: 'vs-dark',
    language: 'html',
    autoClosingBrackets: false,
  };
  @ViewChild('monaco') monaco!: ed;

  private _code: string = this.getCode();

  get code(): string {
    return this._code;
  }
  set code(value: string) {
    this._code = value;
    this.htmlDoc = this.parser.parseFromString(this.code, 'text/html');

    this.printFunc(this.htmlDoc.children);
  }
  printFunc(arr: HTMLCollection) {
    for (let index = 0; index < arr.length; index++) {
      const ele2 = arr[index];
      console.log(
        ele2.nodeName,
        ele2.tagName,
        ele2 instanceof HTMLParagraphElement,
        ele2 instanceof HTMLElement,
        typeof ele2
      );
      this.printFunc(ele2.children);
    }
  }
  getCode() {
    return `<html>
     <head>
     <title>
     Example of Paragraph tag
     </title>
     </head>
     <body>
     <p> <!-- It is a Paragraph tag for creating the paragraph -->
     <b> HTML </b> stands for <i> <u> Hyper Text Markup Language. </u> </i> It is used to create a web pages and applications. This language
     is easily understandable by the user and also be modifiable. It is actually a Markup language, hence it provides a flexible way for designing the
     web pages along with the text.
     </p>
     HTML file is made up of different elements. <b> An element </b> is a collection of <i> start tag, end tag, attributes and the text between them</i>.
     </p>
     </body>
     </html>  `;
  }

  parser = new DOMParser();
  htmlDoc = this.parser.parseFromString(this.code, 'text/html');
}
