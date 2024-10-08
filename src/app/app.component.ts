import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentCode: string = '';
  currentDoc: Document | null = null;
  body!: HTMLElement;
  parser = new DOMParser();
  title = 'DomVisualize';

  updateText($event: string) {
    this.currentCode = $event;
    this.currentDoc = this.parser.parseFromString(
      this.currentCode,
      'text/html'
    );
    this.body = this.currentDoc.body;
  }
}
