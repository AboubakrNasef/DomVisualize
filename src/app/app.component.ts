import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentCode: string = '';

  title = 'DomVisualize';

  updateText($event: string) {
    this.currentCode = $event;
  }
}
